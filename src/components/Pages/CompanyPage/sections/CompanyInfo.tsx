import React from "react";
import CustomText from "../../../Modules/Custom/CustomText";
import CustomTagBlock from "../../../Modules/Custom/CustomTagBlock";

type Props = {
  data: {
    title: string;
    tagList: string;
    region: string;
    repImgUrl?: string;
  };
};

const CompanyInfo = (props: Props) => {
  const { title, tagList, region, repImgUrl } = props.data;
  const tagSplit = tagList.split(",");
  return (
    <div className='flex px-4'>
      <div>
        {/* 이미지 들어갈 자리 */}
        <div className='h-[88px] w-[88px]'>
          <img
            className='h-full w-full object-cover rounded-lg'
            src={repImgUrl}
            alt='company representative image'
          />
        </div>
      </div>
      <div className='flex flex-col justify-around'>
        <div className='font-bold leading-tight mb-1.5'>{title}</div>
        <div className='text-xs leading-tight mb-1'>
          <CustomText type='Content-small' text={`지역 : ${region}`} />
        </div>
        <div>
          <div>
            <CustomTagBlock spreadValues={tagSplit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
