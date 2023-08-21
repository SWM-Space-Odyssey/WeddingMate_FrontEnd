import { Add, Clear } from "@mui/icons-material";
import { Badge, Button, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { set, useController, useFormContext, useWatch } from "react-hook-form";
import CustomText from "./CustomText";
import { useMutation, useQueries } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { postImageAndGetURI } from "../../api/Item";
import { SERVER_IMAGE_URL } from "../../common/constants";

type Props = {
  title: string;
  isImmediately?: boolean;
  maxCount?: number;
  required?: boolean;
};

const ImageUploader = (props: Props) => {
  const { title, isImmediately } = props;
  const { control } = useFormContext();
  const portfolioId = useParams().portfolioId;
  const itemId = useParams().itemId;
  const { field } = useController({
    name: "pictures",
    control,
    rules: { required: true },
  });
  const [prevFiles, setPrevFiles] = useState<File[]>([]);
  const [prevStrings, setPrevStrings] = useState<string[]>([]);
  const maxCount = props.maxCount ?? 1;
  const pictures: File[] | string[] = useWatch({
    control,
    name: "pictures",
  });
  const categoryContent = useWatch({
    control,
    name: "categoryContent",
  });
  const categoryContentText = useWatch({
    control,
    name: "categoryContentText",
  });

  useEffect(() => {
    if (!isImmediately) return;
    if (itemId && pictures) {
      setPrevStrings([...(pictures as string[])]);
    }
  }, [pictures]);

  const bindOnChange = (data: File[] | string[]) => {
    if (!data) return;
    if (typeof data[0] === "string") {
      field.onChange([...data] as string[]);
      setPrevStrings([...data] as string[]);
    } else {
      field.onChange([...data] as File[]);
      setPrevFiles([...data] as File[]);
    }
  };

  const getURIArrFromFileArr = async (data: File[]) => {
    if (!data) return;
    if (categoryContent === "default")
      return alert("카테고리를 먼저 선택해주세요");
    const body = new FormData();
    const itemFileReqDto = {
      portfolioId: portfolioId,
      itemCategory:
        categoryContent === "직접입력" ? categoryContentText : categoryContent,
    };
    const json = JSON.stringify(itemFileReqDto);
    const blob = new Blob([json], { type: "application/json" });
    data.forEach((item) => {
      body.append("file", item);
    });
    body.append("itemFileReqDto", blob);
    const response = await postImageAndGetURI(body);
    return response;
  };

  const badgeContent = (index: number) => {
    return (
      <Clear
        onClick={() => {
          imageDelete(index);
        }}
        sx={{ p: 0, fontSize: ".8rem" }}
        className='cursor-pointer'
      />
    );
  };
  const imageSpread = () => {
    return pictures?.map((item, index) => {
      return (
        <Badge
          badgeContent={badgeContent(index)}
          color='primary'
          key={index}
          // onClick={(e) => {
          //   console.log(e);
          //   imageDelete(index);
          // }}
        >
          <img
            className='w-16 h-16'
            src={
              typeof item !== "string"
                ? URL.createObjectURL(item)
                : typeof item === "string"
                ? `${SERVER_IMAGE_URL}${item}`
                : ""
            }
          />
        </Badge>
      );
    });
  };
  const imageDelete = (targetIndex: number) => {
    if (!pictures) return;

    if (isImmediately) {
      const newArray: File[] = [];
      pictures?.map((item, index) => {
        if (!(targetIndex === index)) newArray.push(item as File);
      });
      bindOnChange([...newArray]);
    } else {
      const newArray: string[] = [];
      pictures?.map((item, index) => {
        if (!(targetIndex === index)) newArray.push(item as string);
      });
      bindOnChange([...newArray]);
    }
  };

  const onChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const FileArray = Array.from(e.target.files);
    if (FileArray.length + (prevFiles?.length ?? 0) > maxCount)
      return alert("최대 사진 수를 초과했습니다!");

    if (isImmediately) {
      const values: string[] = [];
      const handledArray: string[] = [];

      for (let item of FileArray) {
        const res = await getURIArrFromFileArr([item]);
        if (!res) continue;
        values.push(res.data);
      }
      values.forEach((item) => {
        if (!prevStrings?.includes(item)) {
          handledArray.push(item);
        }
      });
      if (prevStrings) {
        bindOnChange([...prevStrings, ...handledArray] as string[]);
      } else {
        bindOnChange([...handledArray] as string[]);
      }
    } else {
      const handledArray: File[] = [];
      for (let item of FileArray) {
        if (!prevFiles?.includes(item)) {
          handledArray.push(item);
        }
      }
      if (prevFiles) {
        bindOnChange([...prevFiles, ...handledArray] as File[]);
      } else {
        bindOnChange([...handledArray] as File[]);
      }
    }
  };

  return (
    <div className='flex flex-col gap-1.5'>
      <div>
        <CustomText type='Title' text='사진' />
        <span className='tracking-widest font-bold text-sm'>
          ({pictures?.length ?? 0}/{maxCount})
        </span>
        {props.required && <span className='text-[#FF6A6A]'>*</span>}
      </div>
      <div className='flex gap-1.5 flex-wrap'>
        <label>
          <div className='flex justify-center items-center w-16 h-16 border'>
            <Add fontSize='large' />
          </div>
          <input
            id='pictures'
            type='file'
            accept='image/*'
            multiple={true}
            onChange={(e) => onChangeHandler(e)}
            className='hidden'
          />
        </label>
        {imageSpread()}
      </div>
    </div>
  );
};

export default ImageUploader;
