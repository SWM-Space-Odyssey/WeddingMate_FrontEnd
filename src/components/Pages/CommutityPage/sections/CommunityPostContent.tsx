import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../../../Modules/Custom/CustomInput";
import CustomButton from "../../../Modules/Custom/CustomButton";
import { MenuItem, Select } from "@mui/material";

type Props = {};
type contentRegister = {
  title: string;
  content: string;
  category: string;
};

const content = {
  state: "content" as const,
  title: "일정 기록",
  placeholder: "일정에 대한 상세한 기록을 작성해주세요",
  multiline: true,
  textCount: true,
};

const CommunityPostContent = (props: Props) => {
  const methods = useForm<contentRegister>({});

  const onSubmit = (data: contentRegister) => {
    console.log(data);
  };
  return (
    <div className='flex flex-col flex-1'>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div>
            <input
              type='text'
              className='border rounded-sm w-full py-2.5 px-3'
              placeholder='하이'
              {...methods.register("title")}
            />
            <CustomInput content={content} />
            <Select>
              <MenuItem>adgs</MenuItem>
            </Select>
          </div>
          <CustomButton text='제출' buttonType='submit' flag={false} />
        </form>
      </FormProvider>
    </div>
  );
};

export default CommunityPostContent;
