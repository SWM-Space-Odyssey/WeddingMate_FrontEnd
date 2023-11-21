import React from "react";
import CustomText from "../../../Modules/Custom/CustomText";
import ImageCard from "./ImageCard";
import SectionHeader from "../../../Modules/SectionHeader";

type Props = {};
const dummyIC = {
  content: "후기",
  date: "2021-09-09",
  writer: {
    name: "김민수",
    profileImgUrl: "",
  },
};

const CustomerReview = (props: Props) => {
  return (
    <div className='flex flex-col px-4'>
      <div className='py-2.5 px-3'>
        <SectionHeader title='후기' buttonURL='/' />
      </div>
      <div>
        <ImageCard data={dummyIC} />
      </div>
    </div>
  );
};

export default CustomerReview;
