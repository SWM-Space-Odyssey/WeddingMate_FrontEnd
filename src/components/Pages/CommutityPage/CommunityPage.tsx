import React from "react";
import { IS_DEV } from "../../../common/constants";

type Props = {};

const CommunityPage = (props: Props) => {
  console.log(IS_DEV);
  return (
    <div className='flex flex-col h-full wfull items-center justify-center'>
      <span className='text-9xl my-10'>🐣</span>
      <span>비공개 투성이인 결혼정보를</span>
      <span>나눌 수 있는 결혼정보 커뮤니티</span>
      <br />
      <span>곧 오픈 예정입니다 기대해주세요!</span>
      {IS_DEV === true && <span>APP TEST for DEV</span>}
    </div>
  );
};

export default CommunityPage;
