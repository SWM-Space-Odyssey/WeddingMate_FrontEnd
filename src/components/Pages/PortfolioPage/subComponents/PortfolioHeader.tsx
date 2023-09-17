import React, { useEffect, useState } from "react";

import CustomTagBlock from "../../../Modules/CustomTagBlock";
import { SERVER_IMAGE_URL } from "../../../../common/constants";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { deletePortfolio } from "../../../../api/portfolio";
import HeaderOptionButton from "../../../Modules/HeaderOptionButton";
import CustomText from "../../../Modules/CustomText";

type tagResDtoList = {
  tagId: number;
  content: string;
  categoryContent: string;
};

type Props = {
  data: {
    title: string;
    tagList: string;
    repImgUrl: string;
    region: string;
    isWriter: boolean;
    plannerId: number;
  };
};

const Mock = ["화려한", "사람많은", "야외"];

const PortfolioHeader = (props: Props) => {
  const { title, tagList, region, repImgUrl, isWriter, plannerId } = props.data;
  const portfolioId = useParams().itemId;
  const navigate = useNavigate();
  const deleteHandler = async () => {
    if (!portfolioId) return;
    const response = await deletePortfolio(parseInt(portfolioId));
    if (response.data.status === "SUCCESS") {
      navigate(-1);
    } else {
      alert("삭제에 실패했습니다. - PortfolioHeader");
    }
  };
  const menuItems = [
    {
      content: (
        <>
          <Edit />
          포트폴리오 수정하기
        </>
      ),
      onClick: () => {
        navigate(`/create/portfolio/${portfolioId}`);
      },
    },
    {
      content: (
        <>
          <Delete />
          포트폴리오 삭제하기
        </>
      ),
      onClick: () => {
        if (confirm("정말로 삭제하시겠습니까?")) {
          deleteHandler();
        }
      },
    },
  ];

  const tagSplit = tagList.split(",");
  return (
    <div className='flex flex-col justify-between mt-4'>
      <div className='flex flex-row justify-between'>
        <div className='flex gap-2.5 '>
          <div>
            <img
              src={`${SERVER_IMAGE_URL}${repImgUrl}?edit=${
                isWriter ?? Date.now()
              }`}
              className='w-[5.5rem] h-[5.5rem] rounded-sm'
            />
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
        {props.data.isWriter && <HeaderOptionButton data={{ menuItems }} />}
      </div>
    </div>
  );
};

export default PortfolioHeader;
