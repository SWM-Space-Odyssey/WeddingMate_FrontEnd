import React from "react";
import CustomText from "../../../Modules/CustomText";
import CustomTagBlock from "../../../Modules/CustomTagBlock";
const mockTag = ["친절한", "답변이빠른", "꼼꼼한"];

type Props = {};

const PlannerInfo = (props: Props) => {
  return (
    <div>
      <div className='flex flex-col items-center mt-4 gap-2'>
        <img
          src='https://images.pexels.com/photos/4491469/pexels-photo-4491469.jpeg'
          className='w-[84px] h-[84px] rounded-full  object-cover'
        />
        <div className='flex flex-col items-center gap-0.5'>
          <CustomText text='플래너' type='Title-large' />
          <CustomText text='소속/직급/서울' type='Description' />
        </div>
        <CustomTagBlock spreadValues={mockTag} />
      </div>
    </div>
  );
};

export default PlannerInfo;
