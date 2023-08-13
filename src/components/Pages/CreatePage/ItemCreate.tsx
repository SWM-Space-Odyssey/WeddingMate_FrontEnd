import React, { useEffect, useRef } from "react";
import ItemCategories from "../ItemPage/subComponent/ItemCategories";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import ImageUpload from "../../Modules/ImageUpload";
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
import { useParams } from "react-router-dom";
import { postItem } from "../../../api/Item";

type Props = {
  adjust?: itemRegister;
};
interface itemRegister {
  categoryContent: string;
  itemTagList: string[];
  itemRecord: string;
  pictures: string[];
  date: string;
  company: string;
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
  const portfolioId = useParams().portfolioId;
  const itemId = useParams().itemId;
  const onSubmit: SubmitHandler<itemRegister> = (data) => {
    if (!portfolioId) return alert("잘못된 접근입니다. - itemCreate");
    if (!itemId) {
      const mock = {
        itemRecord: "너무 예쁜 드레스를 입은 신부님",
        company: "두근두근 웨딩",
        date: "2023-03.30",
        portfolioId: 1,
        categoryContent: "드레스",
        order: 1,
        itemTagList: ["고급스러운", "러블리"],
        imageList: ["portfolio/8/dress/20230812-1612947.jpg"],
      };
      const body = {
        itemRecord: data.itemRecord,
        company: data.company,
        date: data.date,
        portfolioId: parseInt(portfolioId),
        categoryContent: data.categoryContent,
        order: 1,
        imageList: data.pictures,
        itemTagList: data.itemTagList,
      };
      console.log(body, mock);
      const res = postItem(body);
      console.log("res", res);
    } else {
    }
  };

  return (
    <Slide direction='left' in mountOnEnter unmountOnExit>
      <div className='w-full px-4'>
        <Header />
        <button onClick={() => console.log(portfolioId, itemId)}>hh</button>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className='flex flex-col gap-6 h-full'
          >
            <ItemCategories />
            <ImageUpload title='image' maxCount={5} isImmediately={true} />
            <ItemTags formState='itemTagList' />
            <CustomInput content={itemRecord} />
            <CustomDatePicker state='date' />
            <CustomInput content={company} />
            <CustomButton
              text='아이템 추가'
              flag={false}
              buttonType='submit'
              // customFunc={setClose}
            />
          </form>
        </FormProvider>
      </div>
    </Slide>
  );
};

export default ItemCreate;
