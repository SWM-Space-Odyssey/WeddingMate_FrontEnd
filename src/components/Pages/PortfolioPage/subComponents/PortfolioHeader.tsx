import React, { useEffect, useState } from "react";

import CustomTagBlock from "../../../Modules/CustomTagBlock";
import { SERVER_IMAGE_URL } from "../../../../common/constants";
import { CountryList } from "../../../../common/CountryLIst";
import { IconButton, Menu, MenuItem, MenuList } from "@mui/material";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { deletePortfolio } from "../../../../api/portfolio";
import HeaderOptionButton from "../../../Modules/HeaderOptionButton";

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
  };
};

const Mock = ["화려한", "사람많은", "야외"];
const dropdownMenuStyle = {
  fontSize: "0.75rem",
  py: 0,
};
const dropdownIconStyle = {
  fontSize: "1rem",
};

const PortfolioHeader = (props: Props) => {
  const { title, tagList, repImgUrl } = props.data;
  const [location, setLocation] = useState("");
  const [mood, setMood] = useState<string[]>([]);
  const portfolioId = useParams().itemId;
  const navigate = useNavigate();

  const deleteHandler = async () => {
    if (!portfolioId) return;
    const response = await deletePortfolio(parseInt(portfolioId));
    if (response.data.status === "SUCCESS") {
      navigate(-1);
    } else {
      console.log(response);
      alert("삭제에 실패했습니다. - PortfolioHeader");
    }
  };
  const menuItems = [
    {
      content: (
        <>
          <Edit sx={dropdownIconStyle} />
          포트폴리오 수정하기
        </>
      ),
      onClick: () => {
        navigate(`/create/portfolio/${portfolioId}`);
      },
      style: dropdownMenuStyle,
    },
    {
      content: (
        <>
          <Delete sx={dropdownIconStyle} />
          포트폴리오 삭제하기
        </>
      ),
      onClick: () => {
        deleteHandler();
      },
      style: dropdownMenuStyle,
    },
  ];

  useEffect(() => {
    const moodlist: string[] = [];
    tagList.split(",").forEach((tag) => {
      if (CountryList.includes(tag)) {
        setLocation(tag);
      } else {
        moodlist.push(tag);
      }
    });
    setMood(moodlist);
  }, [tagList]);
  return (
    <div className='flex flex-row gap-2.5 mt-5'>
      <div>
        <img
          src={`${SERVER_IMAGE_URL}${repImgUrl}`}
          className='w-[5.5rem] h-[5.5rem] rounded-sm'
        />
      </div>
      <div>
        <div className='font-bold leading-tight mb-1.5'>{title}</div>
        <div className='text-xs leading-tight mb-1'>Location : {location}</div>
        <div>
          <div className='text-xs leading-tight mb-1'>Mood</div>
          <div>
            <CustomTagBlock spreadValues={mood} />
          </div>
        </div>
      </div>
      <HeaderOptionButton data={{ menuItems }} />
    </div>
  );
};

export default PortfolioHeader;
