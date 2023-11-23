import React from "react";
import CustomText from "../../../Modules/Custom/CustomText";
import CustomTagBlock from "../../../Modules/Custom/CustomTagBlock";
import { PROGRESSIVE_IMAGE_URL } from "../../../../common/constants";

type Props = {
  data: {
    name: string;
    adress: string;
    repImgUrl: string;
    tagList?: string;
  };
};

const CompanyInfo = (props: Props) => {
  const { name, tagList, adress, repImgUrl } = props.data;
  const dummyImgURL = PROGRESSIVE_IMAGE_URL + "userPolicy/icon.png";
  const tagSplit = tagList?.split(",");
  return (
    <div className='flex px-4 gap-2'>
      <div>
        {/* 이미지 들어갈 자리 */}
        <div className='h-[88px] w-[88px] rounded-md'>
          <img
            src={repImgUrl ?? dummyImgURL}
            alt=''
            className='h-full w-full rounded-lg'
          />
        </div>
      </div>
      {/* <div className='flex flex-col justify-around'> */}
      <div className='flex flex-col gap-1.5'>
        <div className='font-bold leading-tight mb-1.5'>{name}</div>
        <div className='text-xs leading-tight mb-1'>
          <CustomText type='Content-small' text={`지역 : ${adress}`} />
        </div>
        <div>
          {tagSplit && (
            <div>
              <CustomTagBlock spreadValues={tagSplit} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
