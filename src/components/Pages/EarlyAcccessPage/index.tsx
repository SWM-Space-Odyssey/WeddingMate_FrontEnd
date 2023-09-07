import { Button, Paper } from "@mui/material";
import React from "react";
import CustomText from "../../Modules/CustomText";
import "./index.pcss";
import { EditNote } from "@mui/icons-material";

type Props = {};

const EarlyAccessPage = (props: Props) => {
  const twCenter = "flex flex-col justify-center items-center";
  return (
    <div className={`w-full h-full p-10 ${twCenter}`}>
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
          <CustomText type='Title-large' text='사전예약 감사합니다!' />
          <CustomText type='Title-base' text='본 화면을 캡쳐하셔서' />
          <CustomText
            type='Title-base'
            text='구글폼에 업로드 해주시면 추첨을 통해'
          />
          <CustomText type='Title-base' text=' 노보텔 앰배서더 스위트' />
          <CustomText
            type='Description'
            text='평일(월-금) 주니어 스위트 객실'
          />
          <CustomText type='Title-base' text='1박2일 숙박권 을 드립니다!' />
          <Button variant='contained' sx={{ color: "white" }}>
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
