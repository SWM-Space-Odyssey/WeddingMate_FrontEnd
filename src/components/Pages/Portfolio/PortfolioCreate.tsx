import React, { useEffect } from "react";
import CustomInput from "../../Modules/CustumInput";
import {
  FormProvider,
  SubmitHandler,
  UseFormRegister,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import CustomTagBlock from "../../Modules/CustomTagBlock";
import { MoodTagList } from "../../../store/TagList";
import { CountryList } from "../../../store/CountryLIst";
import { Button } from "@mui/material";
import ImageUpload from "../../Modules/ImageUpload";

type Props = {};
interface PortfolioInputContentType {
  state: "Title";
  title: string;
  placeholder: string;
}

const PortfolioCreate = (props: Props) => {
  const methods = useForm<portfolioFormRegister>();

  const onSubmit: SubmitHandler<portfolioFormRegister> = (data) => {
    console.log("=====Submit Test=======");
    console.log(JSON.stringify(data));
    console.log(data);
    console.log("========================");
  };
  const InputContent: PortfolioInputContentType = {
    state: "Title",
    title: "타이틀",
    placeholder: "제목을 입력해 주세요",
  };

  return (
    <div className='h-full'>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className='flex flex-col gap-6 h-full '
        >
          <CustomInput content={InputContent} />
          <CustomTagBlock
            title='MOOD'
            TagCount={true}
            spreadValues={MoodTagList}
            formElement='Mood'
            tagCountMax={3}
          />
          <CustomTagBlock
            title='Location'
            spreadValues={CountryList}
            formElement='Location'
          />
          <ImageUpload title='image' maxCount={5} />
          <Button
            type='submit'
            sx={{ fontSize: "1rem", bottom: 0 }}
            className='w-full'
            variant='contained'
          >
            추가
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default PortfolioCreate;
