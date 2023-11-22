import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CustomInput from "../../../Modules/Custom/CustomInput";
import CustomButton from "../../../Modules/Custom/CustomButton";
import { MenuItem, Select } from "@mui/material";
import ItemCategories from "../../ItemPage/subComponent/ItemCategories";
import { postContent, putContent } from "../../../../api/community";
import { useNavigate, useParams } from "react-router-dom";
import { useCommunityPost } from "../../../../hooks/QueryHooks";

type Props = {};
type contentRegister = {
  title: string;
  content: string;
  categoryContent: string;
};
type submitBody = {
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
const title = {
  state: "title" as const,
  title: "제목",
  placeholder: "제목을 입력해주세요",
};

const CommunityPostContent = (props: Props) => {
  const methods = useForm<contentRegister>({});
  const postId = useParams()?.postId;
  const navigate = useNavigate();
  const setForm = (formData?: contentRegister) => {
    if (formData) {
      console.log(formData);
      methods.reset(formData);
    } else {
      methods.reset();
    }
  };

  if (postId) {
    const { data } = useCommunityPost(parseInt(postId));
    console.log(data);
    const body = {
      title: data?.data.title,
      content: data?.data.content,
      categoryContent: data?.data.category,
    };
    setForm(body);
  }

  const createPost = async (body: submitBody) => {
    const { status, data } = await postContent(body);
    if (status === "SUCCESS") {
      navigate(`/community`);
      return;
    }
    alert("생성에 실패했습니다");
  };

  const editPost = async (postId: number, body: submitBody) => {
    const { status, data } = await putContent(postId, body);
    if (status === "SUCCESS") {
      navigate(`/community/${postId}`);
      return;
    }
    alert("수정에 실패했습니다");
  };

  const onSubmit = (formData: contentRegister) => {
    const { title, content, categoryContent } = formData;

    if (!title || !content || categoryContent === "default") {
      alert("모든 항목을 작성해주세요");
      return;
    }
    const body = {
      title: title,
      content: content,
      category: categoryContent,
    };

    if (postId) {
      editPost(parseInt(postId), body);
    } else {
      createPost(body);
    }
  };

  return (
    <div className='flex flex-col flex-1 px-4'>
      <FormProvider {...methods}>
        <form
          className='flex-1 flex flex-col gap-2'
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className='flex-1'>
            <CustomInput content={title} />
            <CustomInput content={content} />
            <ItemCategories standAlone />
          </div>
          <CustomButton text='확인' buttonType='submit' flag={false} />
        </form>
      </FormProvider>
    </div>
  );
};

export default CommunityPostContent;
