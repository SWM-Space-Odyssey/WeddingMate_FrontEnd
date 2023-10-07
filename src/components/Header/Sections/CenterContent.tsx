import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { logo } from "../../../assets/logo";

type Props = {};
const headerText = {
  plannermypage: "마이웨딩",
  setting: "설정",
  info: "예식 정보",
  type: "웨딩 플랜 / 스드메",
  createPortfolio: "피드 추가",
  createItem: "아이템 추가",
};
const CenterContent = (props: Props) => {
  const navigate = useNavigate();
  const type = useSelector((state: RootState) => state.user.type);
  const page = useSelector((state: RootState) => state.view.page);
  const location = useLocation().pathname.split("/")[1];
  const subLocation = useLocation().pathname.split("/")[2];
  const maxPage = type === "planner" ? 3 : 4;
  if (location === "regist" && page < maxPage) {
    return (
      <div className='cursor-pointer'>
        <Typography color='#333333'>
          회원가입 ({page + 1}/{maxPage})
        </Typography>
      </div>
    );
  } else {
    return (
      <div className='flex-1 flex justify-center'>
        <div className='cursor-pointer' onClick={() => navigate("/")}>
          {logo}
        </div>
      </div>
    );
  }
};
export default CenterContent;
