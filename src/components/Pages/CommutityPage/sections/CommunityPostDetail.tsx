import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCommunityPost } from "../../../../hooks/QueryHooks";
import { ItemContent } from "../modules/UserPost";
import { parseDateToYMD } from "../../../Modules/Func/parseDateToYMD";
import {
  PROGRESSIVE_IMAGE_URL,
  SERVER_IMAGE_URL,
} from "../../../../common/constants";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Delete, EditNote, HighlightOff, Telegram } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { deleteComment, postComment } from "../../../../api/community";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useDispatch } from "react-redux";
import { setIsWriter } from "../../../../store/viewSlice";

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
  const isNative = /Mobi/i.test(window.navigator.userAgent);
  const { ref, ...rest } = methods.register("comment");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.reportTargetId);
  if (!postId) {
    return (
      <div className='flex flex-col flex-1'>
        <div className='text-4xl'>🚧</div>
        <div>잘못된 접근입니다.</div>
      </div>
    );
  }

  const { data } = useCommunityPost(parseInt(postId));
  const body: PostBody = data.data;
  useEffect(() => {
    if (data.status === "FAIL") {
      alert("연결에 실패했습니다. 관리자에게 문의해주세요.");
      navigate("/community");
    }
    if (body.userId === userId) {
      dispatch(setIsWriter(true));
    }
    return () => {
      dispatch(setIsWriter(false));
    };
  }, [data, body]);

  const onSubmit: SubmitHandler<commentForm> = async (submit) => {
    if (submit.comment.trim() === "") return alert("댓글을 입력해주세요");
    const { status, data } = await postComment(
      parseInt(postId),
      submit.comment
    );
    if (status === "SUCCESS") {
      navigate(0);
    }
  };

  const onDelete = async (commentId: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const { status, data } = await deleteComment(commentId);
      if (status === "SUCCESS") {
        navigate(0);
      }
    }
  };

  return (
    <div className='flex flex-1 px-4'>
      <div className='mainContent flex-1 flex flex-col'>
        <div className='contentHeader flex justify-between'>
          <div className='flex gap-2'>
            <div>
              <div className='text-lg font-bold'>{body.title}</div>
              <div className='text-xs text-gray-500'>{`${parseDateToYMD(
                new Date(body.date)
              )}`}</div>
            </div>
            {body.userId === userId && (
              <div className='writerButtons flex justify-end'>
                <IconButton>
                  <Delete fontSize='small' />
                </IconButton>
                <IconButton>
                  <EditNote fontSize='small' />
                </IconButton>
              </div>
            )}
          </div>
          <div className='flex items-center gap-2'>
            <img
              src={PROGRESSIVE_IMAGE_URL + body.profileImg + "?q=10"}
              alt='writerImg'
              className='w-8 h-8 rounded-full'
            />
            <a href={`/planner/${body.userId}`}>
              <div className='text-sm'>{body.writer}</div>
            </a>
          </div>
        </div>

        <div className='contentBody py-4 border-b-2'>
          <p>{body.content}</p>
        </div>

        <div className='comment flex-1 py-2'>
          <ul className='flex flex-col gap-2'>
            {body.commentList.map((item: commentBody, index: number) => (
              <li key={index} className='flex gap-2'>
                <img
                  src={SERVER_IMAGE_URL + item.profileImg}
                  alt='writerImg'
                  className='w-5 h-5 rounded-full'
                />
                <div className='flex flex-col flex-1'>
                  <div className='flex items-center justify-between gap-2'>
                    <div className='text-sm'>{item.writer}</div>
                    <div className='flex items-center text-xs text-gray-500 gap-1'>
                      {parseDateToYMD(new Date(item.date))}
                      {item.userId === userId && (
                        <IconButton
                          onClick={() => onDelete(item.commentId)}
                          disableRipple
                          color='primary'
                          sx={{ p: 0 }}
                        >
                          <HighlightOff sx={{ fontSize: "1rem" }} />
                        </IconButton>
                      )}
                    </div>
                  </div>
                  <div>{item.content}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={`commentForm flex ${isNative ? "mr-4" : ""}`}>
          <form
            className='flex flex-1 items-center'
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div
              className='h-10 py-2.5 px-2 my-4 bg-[#F5F5F5] rounded-sm cursor-text flex flex-1'
              onClick={() => {
                if (focusRef.current) {
                  focusRef.current.focus();
                }
              }}
            >
              <div className='flex flex-1 items-center gap-1 h-5'>
                <input
                  className='outline-none text-sm flex-1 bg-[#F5F5F5] text-[#000000]'
                  {...rest}
                  name='comment'
                  ref={(e) => {
                    ref(e);
                    focusRef.current = e;
                  }}
                  placeholder='댓글을 입력해주세요'
                  autoComplete='off'
                />
              </div>
            </div>
            <Button sx={{ height: "fit-content" }} type='submit'>
              <Telegram />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommunityPostDetail;
