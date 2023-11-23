import React, { useEffect } from "react";
import CompanyInfo from "./sections/CompanyInfo";
import CustomerReview from "./sections/CustomerReview";
import { useNavigate, useParams } from "react-router-dom";
import { useCompanyDetail } from "../../../hooks/QueryHooks";
import ImageBlock from "./sections/ImageBlock";

type Props = {};
type TCompanyData = {
  address: string;
  imageList: string[];
  itemList: string[];
  isMoreThanNineImages: boolean;
  name: string;
};

const CompanyPage = (props: Props) => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  if (!companyId) return <div>잘못된 접근입니다.</div>;
  const { status, data } = useCompanyDetail(parseInt(companyId));
  const body: TCompanyData = data?.data;
  useEffect(() => {
    if (!body.address) {
      alert("잘못된 접근입니다.");
      navigate("/");
      return;
    }
  }, [body]);
  console.log(body);
  const companyInfo = {
    adress: body.address,
    name: body.name,
    repImgUrl: body.imageList ? body.imageList[0] : "",
  };
  const dummyCI = {
    title: "더 파티움 여의도 웨딩홀",
    tagList: "화려한,사람많은,야외",
    region: "서울 여의도",
  };

  return (
    <div className='flex flex-col h-full'>
      <div>
        <CompanyInfo data={companyInfo} />
      </div>
      <div className='ImageBlock'>
        <ImageBlock />
      </div>
      <div className='flex-1'>
        <CustomerReview />
      </div>
    </div>
  );
};

export default CompanyPage;
