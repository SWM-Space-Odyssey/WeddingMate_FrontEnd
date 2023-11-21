import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCommunityPost } from "../../../../hooks/QueryHooks";
import { ItemContent } from "../modules/UserPost";
import { parseDateToYMD } from "../../../Modules/Func/parseDateToYMD";
import { SERVER_IMAGE_URL } from "../../../../common/constants";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type Props = {};
type commentBody = {
  commentId: number;
  content: string;
  date: Date;
  isWriter: boolean;
  profileImg: string;
  userId: number;
  writer: string;
};
type PostBody = ItemContent & {
  userId: number;
  isWriter: boolean;
  commentList: commentBody[];
  profileImg: string;
};

type commentForm = {
  comment: string;
};
const CommunityPostDetail = (props: Props) => {
  const IMG_URL = SERVER_IMAGE_URL;
  const methods = useForm<commentForm>({});
  const { postId } = useParams();
  const focusRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = methods.register("comment");
  const navigate = useNavigate();

  if (!postId) {
    return (
      <div className='flex flex-col flex-1'>
        <div className='text-4xl'>🚧</div>
        <div>잘못된 접근입니다.</div>
      </div>
    );
  }

  const { data, isSuccess } = useCommunityPost(parseInt(postId));
  const body: PostBody = data.data;

  useEffect(() => {
    if (data.status === "FAIL") {
      alert("연결에 실패했습니다. 관리자에게 문의해주세요.");
      navigate("/community");
    }
  }, [data]);

  const onSubmit: SubmitHandler<commentForm> = async (data) => {
    console.log(data);
  };

  return (
    <div className='flex flex-1 px-8'>
      <div className='mainContent flex-1 flex flex-col'>
        <div className='contentHeader flex justify-between'>
          <div>
            <div className='text-lg font-bold'>{body.title}</div>
            <div className='text-xs text-gray-500'>{`${parseDateToYMD(
              new Date(body.date)
            )}`}</div>
          </div>
          <div className='flex items-center gap-2'>
            <img
              src={SERVER_IMAGE_URL + body.profileImg}
              alt='writerImg'
              className='w-10 h-10 rounded-full'
            />
            <a href={`/planner/${body.userId}`}></a>
            <div className='text-sm'>{body.writer}</div>
          </div>
        </div>
        <div className='contentBody py-4 border-b-2'>
          <p>{body.content}</p>
        </div>
        <div className='comment flex-1 py-2'>asdg</div>
        <div
          className='h-10 py-2.5 px-2 mb-4 bg-[#F5F5F5] rounded-sm cursor-text flex'
          onClick={() => {
            if (focusRef.current) {
              focusRef.current.focus();
            }
          }}
        >
          <div className='flex flex-1 items-center gap-1 h-5'>
            <form
              className='w-full flex'
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <input
                className='outline-none text-sm flex-1 bg-[#F5F5F5] text-[#000000]'
                {...rest}
                name='search'
                ref={(e) => {
                  ref(e);
                  focusRef.current = e;
                }}
                placeholder='검색어를 입력해 주세요'
                autoComplete='off'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPostDetail;
