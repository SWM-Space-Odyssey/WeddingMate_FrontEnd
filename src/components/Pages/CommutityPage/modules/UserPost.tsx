import React from "react";
import CustomTag from "../../../Modules/Custom/CustomTag";
import { useCommunityList } from "../../../../hooks/QueryHooks";
import { calculateTimeDiff } from "../../../Modules/Func/calculateTimeDiff";

type Props = {
  page: number;
};
export type ItemContent = {
  category: string;
  content: string;
  commentCnt: number;
  date: Date;
  title: string;
  writer: string;
  postId: number;
};

const UserPost = (props: Props) => {
  const { data, isError, isLoading, isSuccess } = useCommunityList(props.page);

  const postSection = (item: ItemContent, index: number) => {
    return (
      <li
        key={`${props.page}-${index}`}
        className='flex flex-col min-h-[7rem] shadow-md rounded-md'
      >
        <a
          href={`/community/${item.postId}`}
          className='flex flex-col flex-1 p-4'
        >
          <ul className='flex flex-col flex-1'>
            <li className='flex gap-2 items-center'>
              <CustomTag text={item.category} />
              <span className='text-xl'>{item.title}</span>
            </li>
            <li className='flex flex-col flex-1'>
              <p className='flex-1 text-sm text-gray-500'>{item.content}</p>
            </li>
            <li className='flex justify-between text-xs'>
              <span className='flex gap-2'>
                <span>댓글 {item.commentCnt} 개</span>
                <span>{calculateTimeDiff(item.date)} 전</span>
              </span>
              <span>{item.writer}</span>
            </li>
          </ul>
        </a>
      </li>
    );
  };

  return (
    <div>
      <ul className='flex flex-col gap-2'>
        {isSuccess &&
          data.data.content.map((item: ItemContent, index: number) =>
            postSection(item, index)
          )}
      </ul>
    </div>
  );
};

export default UserPost;
