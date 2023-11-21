import React, { Suspense, useEffect, useState } from "react";
import { IS_DEV } from "../../../common/constants";
import UserPost from "./modules/UserPost";
import { Pagination } from "@mui/material";
import { getCommunityList } from "../../../api/community";
import { useCommunityList } from "../../../hooks/QueryHooks";

type Props = {};
const empty = (
  <div className='flex flex-col h-full wfull items-center justify-center'>
    <span className='text-9xl my-10'>🐣</span>
    <span>비공개 투성이인 결혼정보를</span>
    <span>나눌 수 있는 결혼정보 커뮤니티</span>
    <br />
    <span>곧 오픈 예정입니다 기대해주세요!</span>
    {IS_DEV === true && <span>APP TEST for DEV</span>}
  </div>
);
const CommunityPage = (props: Props) => {
  const [page, setPage] = useState(0);
  const { data, isError, isLoading, isSuccess } = useCommunityList(page);
  if (page === 0 && isSuccess) {
    setPage(Math.ceil(data.data.totalElements / 10));
  }

  return (
    <>
      {/* {empty} */}
      <div className='flex flex-col h-full px-4'>
        {/* <button onClick={() => console.log(data)}>TEST BUTTON</button> */}
        <div className='flex-1'>
          <UserPost page={page} />
        </div>
        <div className='flex justify-center pb-6 pt-4'>
          <Pagination count={page} />
        </div>
      </div>
    </>
  );
};

export default CommunityPage;
