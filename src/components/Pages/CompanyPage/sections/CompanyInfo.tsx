import React from "react";
import CustomText from "../../../Modules/CustomText";
import CustomTagBlock from "../../../Modules/CustomTagBlock";

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
    <div className='flex'>
      <div>
        <div className='h-[88px] w-[88px]'></div>
      </div>
      <div className='flex flex-col justify-around'>
        <div className='font-bold leading-tight mb-1.5'>{title}</div>
        <div className='text-xs leading-tight mb-1'>
          <CustomText type='Content-small' text={`Location : ${region}`} />
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
