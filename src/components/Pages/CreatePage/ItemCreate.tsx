import React, { useEffect, useRef, useState } from "react";
import ItemCategories from "../ItemPage/subComponent/ItemCategories";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import ImageUploader from "../../Modules/ImageUploader";
import ItemTags from "./ItemTags";
import CustomInput from "../../Modules/CustumInput";
import CustomDatePicker from "../../Modules/CustomDatePicker";
import CustomButton from "../../Modules/CustomButton";
import { Slide } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import { PrevPage } from "../../../store/viewSlice";
import Header from "../../Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { getItem, postItem, putItem } from "../../../api/Item";
import { dateFormatter } from "../../../hooks/apiHook";
import LodingSpinner from "../../Modules/LodingSpinner";
import { Edit } from "@mui/icons-material";

type Props = {
  adjust?: itemRegister;
};
interface itemRegister {
  categoryContent: string;
  categoryContentText: string;
  itemTagList: string[];
  itemRecord: string;
  pictures: string[];
  date: Date;
  company: string;
  order: number;
}
const itemRecord = {
  state: "itemRecord" as const,
  title: "일정 기록",
  placeholder: "일정에 대한 상세한 기록을 작성해주세요",
  multiline: true,
  textCount: true,
};
const company = {
  state: "company" as const,
  title: "업체명",
  placeholder: "업체명을 기입해주세요",
};

const ItemCreate = (props: Props) => {
  const methods = useForm<itemRegister>({});
  const [isEdit, setIsEdit] = useState<null | number>(null);
  const [loadging, setLoadging] = useState<boolean>(false);
  const [initTags, setInitTags] = useState<string[]>([]);
  const itemId = useParams().itemId;
  const order = useParams().order;
  const portfolioId = useParams().portfolioId;
  console.log(portfolioId, order, itemId);
  const navigate = useNavigate();

  const setForm = (data?: itemRegister) => {
    if (data) {
      methods.reset(data);
      setInitTags(data.itemTagList);
    } else {
      methods.reset();
      setInitTags([]);
    }
  };

  const getInitData = async (itemId: number) => {
    setIsEdit(itemId);
    const res = await getItem("item", itemId);
    console.log(res);
    if (res?.status === "SUCCESS" && res.data.typeTag === "item") {
      const data = res.data;
      const itemTagList = data.itemTagList.split(",");
      const categoryContent =
        data.category !== "직접입력" ? data.category : "직접입력";
      const categoryContentText =
        data.category !== "직접입력" ? "" : data.category;
      const pictures = data.imageList;
      const itemRecord = data.itemRecord;
      const date = new Date(data.date);
      const company = data.company;
      // setInitTags(itemTagList);
      const form = {
        itemTagList,
        categoryContent,
        categoryContentText,
        pictures,
        itemRecord,
        date,
        order: res.data.order,
        company,
      };
      setForm(form);
    }
  };

  const onSubmit: SubmitHandler<itemRegister> = async (data) => {
    if (!portfolioId) return alert("잘못된 접근입니다. - itemCreate");
    const category =
      data.categoryContent !== "직접입력"
        ? data.categoryContent
        : data.categoryContentText;

    const body = {
      itemRecord: data.itemRecord,
      company: data.company,
      date: dateFormatter(data.date),
      portfolioId: parseInt(portfolioId),
      category: category.replace(/(\s*)/g, ""),
      order: data.order,
      imageList: data.pictures,
      itemTagList: data.itemTagList.join(","),
    };
    if (!isEdit) {
      if (!order) return;
      body.order = parseInt(order);
      console.log(body);
      setLoadging(true);
      const res = await postItem(body);
      console.log("res", res);
      if (res.status === "SUCCESS") {
        setForm();
        setTimeout(() => {
          setLoadging(false);
          navigate(-1);
        }, 1000);
        return;
      }
      console.log("아이템 등록에 실패했습니다.");
    } else {
      const res = await putItem(isEdit, body);
      if (res.status === "SUCCESS") {
        setForm();
        setTimeout(() => {
          setLoadging(false);
          navigate(-1);
        }, 1000);
        return;
      }
      console.log("아이템 수정에 실패했습니다.");
    }
  };

  useEffect(() => {
    if (!itemId || !portfolioId) return;
    const isValidItemId = parseInt(itemId);
    const isValidPortfolioId = parseInt(portfolioId);
    if (!isValidItemId || !isValidPortfolioId) return;
    getInitData(isValidItemId);
  }, [itemId]);

  return (
    <>
      <div>
        <Header />
      </div>

      <Slide direction='left' in mountOnEnter unmountOnExit>
        <div className='w-full h-full px-4 flex flex-col'>
          {loadging && (
            <div className='absolute backdrop-blur-sm w-full h-full z-50'>
              <LodingSpinner />
            </div>
          )}
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className='flex flex-col gap-6 flex-1 justify-between pt-6'
            >
              <div className='flex flex-col gap-6'>
                <ItemCategories required />
                <ImageUploader
                  title='image'
                  maxCount={5}
                  isImmediately={true}
                  required
                />
                <ItemTags
                  formState='itemTagList'
                  initValue={initTags}
                  required
                />
                <CustomInput content={itemRecord} required />
                <CustomDatePicker state='date' />
                <CustomInput content={company} />
              </div>
              <CustomButton
                text='아이템 추가'
                flag={false}
                buttonType='submit'
              />
            </form>
          </FormProvider>
        </div>
      </Slide>
    </>
  );
};

export default ItemCreate;
