import React from "react";
import CustomText from "../../../Modules/Custom/CustomText";
import { ArrowForwardIos } from "@mui/icons-material";
import { useCompanyDetail } from "../../../../hooks/QueryHooks";
import { getCompany } from "../../../../api/Item";
import { TCompanyData } from "../SearchPage";
import LikeButton from "../../../Modules/LikeButton";
import CustomTag from "../../../Modules/Custom/CustomTag";

type Props = {
  data: TCompanyData[];
  search?: string;
};
const empty = (
  <div>
    <div className='flex justify-center'>검색결과가 없습니다.</div>
  </div>
);
const SearchPlanner = (props: Props) => {
  const { data } = props;
  // const { data } = useCompanyDetail(parseInt(companyId as string)); // api 완성 시 붙이기
  return (
    <div className='flex flex-col px-4 py-3 border-t-8 border-b-8'>
      <CustomText type='Title-large' text='업체' />
      {props.data.length > 0 &&
        props.data.map((company, index) => (
          <div key={index} className='flex justify-between items-center py-2'>
            <div className='flex gap-2'>
              <CustomTag text={company.category} />
              <span>{company.name}</span>
            </div>

            <LikeButton
              isLiked={company.liked}
              targetId={company.companyId}
              type='company'
            />
          </div>
        ))}
      {props.search && (
        <div className='flex justify-center'>
          <button className='text-xs border rounded-3xl w-fit py-2 px-4'>
            <span className='  '>' {props.search} '</span> 검색결과 더 보기
            <ArrowForwardIos fontSize='inherit' />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPlanner;
