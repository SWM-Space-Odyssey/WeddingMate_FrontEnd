import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Slide,
} from "@mui/material";
import React from "react";
import CustomText from "../../../Modules/CustomText";
import { useNavigate } from "react-router-dom";
import { userLogOut } from "../../../../api/user";

type Props = {};
const Gap = (props: { height: number }) => (
  <Box sx={{ height: `${props.height}px`, bgcolor: "#F5F5F5" }} />
);

const SettingList = (props: Props) => {
  const navigate = useNavigate();
  const LogOutHandler = () => {
    if (window.confirm("로그아웃 하시겠습니까?") === false) return;
    userLogOut().then((res) => {
      if (res.status === "SUCCESS") {
        localStorage.removeItem("accessToken");
        navigate("/login");
      } else {
        alert("로그아웃에 실패했습니다.");
      }
    });
  };
  return (
    <div>
      <List>
        <ListItemButton
          onClick={() => navigate("/plannermypage/setting/?type=info")}
        >
          <div className='flex justify-between w-full'>
            <div className='flex flex-col'>
              <CustomText type='Title-base' text='예식 정보' />
              <CustomText type='Description' text='예식일, 지역 정보 보기' />
            </div>
            <div className='flex items-center'>
              <ArrowRight />
            </div>
          </div>
        </ListItemButton>
        <Gap height={1} />
        <ListItemButton
          onClick={() => navigate("/plannermypage/setting/?type=tags")}
        >
          <div className='flex justify-between w-full'>
            <div className='flex flex-col'>
              <CustomText type='Title-base' text='웨딩 플랜 / 스드메' />
              <CustomText
                type='Description'
                text='예산, 분위기, 드레스 소재, 스튜디오 등 정보 보기'
              />
            </div>
            <div className='flex items-center'>
              <ArrowRight />
            </div>
          </div>
        </ListItemButton>
        <Gap height={8} />
        <ListItemButton onClick={() => LogOutHandler()}>
          <div className='flex justify-between w-full'>
            <div className='flex flex-col'>
              <CustomText type='Title-base' text='로그아웃' />
            </div>
            <div className='flex items-center'>
              <ArrowRight />
            </div>
          </div>
        </ListItemButton>
        <Gap height={1} />
      </List>
      <Button sx={{ pl: 2 }}>
        <div className='flex justify-between w-full'>
          <div className='flex flex-col'>
            <CustomText type='Description' text='탈퇴하기' />
          </div>
        </div>
      </Button>
    </div>
  );
};

export default SettingList;
