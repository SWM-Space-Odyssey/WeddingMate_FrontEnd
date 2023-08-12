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

type Props = {
  adjust?: itemRegister;
};
interface itemRegister {
  categoryContent: string;
  itemTagList: string[];
  itemRecord: string;
  pictures?: string[];
  date?: string;
  company?: string;
}

const ItemCreate = (props: Props) => {
  const methods = useForm<itemRegister>({});
  const onSubmit: SubmitHandler<itemRegister> = (data) => {
    console.log(data);
  };
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

  return (
    <Slide direction='left' in mountOnEnter unmountOnExit>
      <div className='w-full px-4'>
        <Header />
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className='flex flex-col gap-6 h-full'
          >
            <ItemCategories />
            <ImageUpload title='image' maxCount={5} />
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
