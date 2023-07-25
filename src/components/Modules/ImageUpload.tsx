import { Add, Clear } from "@mui/icons-material";
import { Badge, Button, Input } from "@mui/material";
import React, { useState } from "react";
import { useController, useFormContext, useWatch } from "react-hook-form";

type Props = {
  title: string;
  maxCount?: number;
};

const ImageUpload = (props: Props) => {
  const { control } = useFormContext();

  const { field } = useController({
    name: "Picture",
    control,
    rules: { required: true },
  });
  const [prevFiles, setPrevFiles] = useState<File[]>();
  const maxCount = props.maxCount ?? 1;

  const pictures: File[] = useWatch({
    control,
    name: "Picture",
  });

  const imageSpread = () => {
    return pictures?.map((item, index) => {
      return (
        <Badge
          sx={{ p: 0 }}
          badgeContent='X'
          color='primary'
          key={index}
          onClick={() => imageDelete(index)}
        >
          <img className='w-16 h-16' src={URL.createObjectURL(item)} />
        </Badge>
      );
    });
  };
  const imageDelete = (targetIndex: number) => {
    if (!pictures) return;

    const newArray: File[] = [];
    pictures?.map((item, index) => {
      if (!(targetIndex === index)) newArray.push(item);
    });
    field.onChange([...newArray]);
    setPrevFiles([...newArray]);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const FileArray = Array.from(e.target.files);
    if (FileArray.length + (prevFiles?.length ?? 0) > maxCount)
      return alert("최대 사진 수를 초과했습니다!");
    const handledArray = [];
    for (let item of FileArray) {
      if (!prevFiles?.includes(item)) {
        handledArray.push(item);
      }
    }
    if (prevFiles) {
      field.onChange([...prevFiles, ...handledArray]);
      setPrevFiles([...prevFiles, ...handledArray]);
    } else {
      field.onChange(handledArray);
      setPrevFiles(handledArray);
    }
  };

  return (
    <div className='flex flex-col gap-1.5'>
      <div>
        <span>사진</span>
        <span className='tracking-widest'>
          ({pictures?.length ?? 0}/{maxCount})
        </span>
      </div>
      <div className='flex gap-1.5 flex-wrap'>
        <label>
          <div className='flex justify-center items-center w-16 h-16 border'>
            <Add fontSize='large' />
          </div>
          <input
            id='Picture'
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

export default ImageUpload;
