import React from "react";
import CustomText from "../../../Modules/CustomText";
import { ArrowForwardIos } from "@mui/icons-material";

type Props = {
  search: string;
};
const empty = (
  <div>
    <div className='flex justify-center'>검색결과가 없습니다.</div>
  </div>
);
const SearchPlanner = (props: Props) => {
  const { search } = props;
  const data = empty; // api 완성 시 붙이기
  return (
    <div className='flex flex-col px-4 py-3 border-t-8 border-b-8'>
      <CustomText type='Title-large' text='업체' />
      <div className='flex justify-center'>
        <button className='text-xs border rounded-3xl w-fit py-2 px-4'>
          <span className='  '>' {search} '</span> 검색결과 더 보기
          <ArrowForwardIos fontSize='inherit' />
        </button>
      </div>
    </div>
  );
};

export default SearchPlanner;
