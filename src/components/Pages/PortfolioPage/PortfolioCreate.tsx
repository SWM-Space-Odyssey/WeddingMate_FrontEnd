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
import { MoodTagList } from "../../../common/TagList";
import { CountryList } from "../../../common/CountryLIst";
import { Button, Slide } from "@mui/material";
import ImageUpload from "../../Modules/ImageUpload";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

type Props = {};
interface PortfolioInputContentType {
  state: "Title";
  title: string;
  placeholder: string;
}

const PortfolioCreate = (props: Props) => {
  const view = useSelector((state: RootState) => state.view.currentView);
  const methods = useForm<portfolioRegister>();
  const onSubmit: SubmitHandler<portfolioRegister> = (data) => {
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
    <Slide direction='left' in={view === "PortfolioCreate"}>
      <div className='absolute h-full px-4'>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className='flex flex-col gap-6 h-full '
          >
            <CustomInput content={InputContent} />
            <CustomTagBlock
              title='MOOD'
              renderCounter={true}
              spreadValues={MoodTagList}
              formState='Mood'
              maxTag={3}
            />
            <CustomTagBlock
              title='Location'
              spreadValues={CountryList}
              formState='Location'
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
    </Slide>
  );
};

export default PortfolioCreate;
