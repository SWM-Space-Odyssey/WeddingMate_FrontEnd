import { Button, Paper } from "@mui/material";
import React from "react";
import CustomText from "../../Modules/Custom/CustomText";
import "./index.pcss";
import { EditNote } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

type Props = {};

const EarlyAccessPage = (props: Props) => {
  const twCenter = "flex flex-col justify-center items-center";
  const nickname = useSelector((state: RootState) => state.user.nickname);
  return (
    <div className={`w-full h-full p-4 ${twCenter}`}>
      <Paper
        elevation={4}
        sx={{
          borderRadius: "32px",
          p: 2,
          width: "100%",
        }}
      >
        <div className={`${twCenter} gap-2`}>
          <span className='text-[5rem] bounce'>🥳</span>
          <CustomText type='Title-large' text={`${nickname} 예비부부님!`} />
          <CustomText type='Title-large' text='사전예약 감사합니다!' />
          <CustomText
            type='Title'
            text='본 화면을 캡쳐하셔서 구글폼에 업로드하면'
          />
          <CustomText type='Title' text='1️⃣ 100% 스타벅스 기프티콘' />
          <CustomText
            type='Title'
            text='2️⃣ 추첨을 통해 노보텔 앰버서더 스위트 평일 숙박권'
          />
          <CustomText type='Title' text='을 드립니다!' />
          <Button
            variant='contained'
            sx={{ color: "white" }}
            href='https://forms.gle/YFDcRNkFJZMtmQtJ6'
          >
            <EditNote />
            <CustomText type='Title' text='구글폼 바로가기' />
          </Button>
          <div>
            <CustomText
              type='Content-small'
              text={new Date().toLocaleDateString()}
            />
            <CustomText
              type='Content-small'
              text={new Date().toLocaleTimeString()}
            />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default EarlyAccessPage;
