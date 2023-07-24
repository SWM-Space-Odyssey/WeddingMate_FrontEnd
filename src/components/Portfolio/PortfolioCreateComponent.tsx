import React, { useEffect } from "react";
import InputComponent from "../Units/InputComponent";
import {
  FormProvider,
  SubmitHandler,
  UseFormRegister,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import TagComponent from "../Units/TagComponent";
import { MoodTagList } from "../../store/TagList";
import { CountryList } from "../../store/CountryLIst";
import { Button } from "@mui/material";

type Props = {};
interface PortfolioInputContentType {
  state: "Title";
  title: string;
  placeholder: string;
}

const PortfolioCreateComponent = (props: Props) => {
  const methods = useForm<portfolioFormRegister>();

  const onSubmit: SubmitHandler<portfolioFormRegister> = (data) => {
    alert(JSON.stringify(data));
  };
  const InputContent: PortfolioInputContentType = {
    state: "Title",
    title: "타이틀",
    placeholder: "제목을 입력해 주세요",
  };
  useEffect(() => {
    console.log("hoihihi");
  }, [methods.watch("Mood")]);

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputComponent content={InputContent} />
          <TagComponent
            title='MOOD'
            TagCount={true}
            spreadValues={MoodTagList}
            formElement='Mood'
            tagCountMax={3}
          />
          <TagComponent
            title='Location'
            spreadValues={CountryList}
            formElement='Location'
          />
          <Button type='submit' sx={{ fontSize: "1rem" }} className='w-full'>
            웨딩 사진 보러가기
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default PortfolioCreateComponent;
