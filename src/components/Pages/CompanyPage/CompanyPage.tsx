import React from "react";
import CompanyInfo from "./sections/CompanyInfo";
import ImageCard from "../../Modules/ImageCard";
import CustomerReview from "./sections/CustomerReview";

type Props = {};

const CompanyPage = (props: Props) => {
  const dummyCI = {
    title: "더 파티움 여의도 웨딩홀",
    tagList: "화려한,사람많은,야외",
    region: "서울 여의도",
  };

  return (
    <div className='flex flex-col h-full'>
      <div>
        <CompanyInfo data={dummyCI} />
      </div>
      <div className='flex-1'>
        <CustomerReview />
      </div>
    </div>
  );
};

export default CompanyPage;
