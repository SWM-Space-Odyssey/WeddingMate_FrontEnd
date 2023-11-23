import React from "react";
import CustomText from "../../../Modules/Custom/CustomText";
import ReviewCard from "./ReviewCard";
import SectionHeader from "../../../Modules/SectionHeader";

export type ReviewData = {
  repImgUrl: string;
  itemRecord: string;
  itemDate: string;
  userId: number;
};
type Props = { ReviewData: ReviewData[] };
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
      <div className='py-2.5'>
        <SectionHeader title='후기' buttonURL='/' />
      </div>
      <div>
        {props?.ReviewData &&
          props.ReviewData.map((review, index) => {
            return <ReviewCard key={index} review={review} />;
          })}
      </div>
    </div>
  );
};

export default CustomerReview;
