import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../../../Modules/Custom/CustomInput";
import CustomButton from "../../../Modules/Custom/CustomButton";
import { MenuItem, Select } from "@mui/material";
import ItemCategories from "../../ItemPage/subComponent/ItemCategories";
import { postContent } from "../../../../api/community";

type Props = {};
type contentRegister = {
  title: string;
  content: string;
  categoryContent: string;
};

const content = {
  state: "content" as const,
  title: "일정 기록",
  placeholder: "일정에 대한 상세한 기록을 작성해주세요",
  multiline: true,
  textCount: true,
};
const title = {
  state: "title" as const,
  title: "제목",
  placeholder: "제목을 입력해주세요",
};

const CommunityPostContent = (props: Props) => {
  const methods = useForm<contentRegister>({});

  const onSubmit = async (formData: contentRegister) => {
    const body = {
      title: formData.title,
      content: formData.content,
      category: formData.categoryContent,
    };
    const { status, data } = await postContent(body);
    if (status === "SUCCESS") {
      console.log("good");
    }
    console.log(formData);
  };
  return (
    <div className='flex flex-col flex-1 px-4'>
      <FormProvider {...methods}>
        <form
          className='flex-1 flex flex-col'
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className='flex-1'>
            <CustomInput content={title} />
            <CustomInput content={content} />
            <ItemCategories standAlone required />
          </div>
          <CustomButton text='제출' buttonType='submit' flag={false} />
        </form>
      </FormProvider>
    </div>
  );
};

export default CommunityPostContent;
