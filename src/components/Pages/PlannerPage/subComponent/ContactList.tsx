import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ContactCard from "./ContactCard";

type Props = {};
const mockData = {
  data1: {
    writer: "5월의 신부",
    message: "안녕하세요. 5월의 신부입니다 ㅎㅎ",
    contact: "010-1234-5678",
  },
  data2: {
    writer: "스몰웨딩 하고싶어요",
    message: "안녕하세요! 꼼꼼하신 플래너님을 찾고있어요!",
    contact: "010-1234-5678",
  },
  data3: {
    writer: "가성비웨딩",
    message:
      "안녕하세요! 가성비좋은 결혼식을 준비하려는데 한번 상담 받아보고 싶어요!",
    contact: "010-1234-5678",
  },
};

const ContactList = (props: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const stopPropagationForTab = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.stopPropagation();
    }
  };
  const contentBody = () => {
    return (
      <div className='flex flex-col gap-2'>
        <div className='flex justify-between items-center'>
          <div className='text-sm'>플래너님께 온 상담요청 총 3건</div>
        </div>
        <ContactCard body={mockData.data1} />
        <ContactCard body={mockData.data2} />
        <ContactCard body={mockData.data3} />
      </div>
    );
  };
  return (
    <div>
      <div onClick={handleClickOpen}>
        상담 요청 보기
        {/* <Settings color='secondary' fontSize='large' /> */}
      </div>
      <Dialog
        open={open}
        onClose={() => handleClose()}
        onKeyDown={stopPropagationForTab}
      >
        <DialogTitle sx={{ minWidth: "20rem" }} className='sticky'>
          상담 요청 리스트
        </DialogTitle>
        <DialogContent sx={{ maxWidth: "28rem" }}>
          {contentBody()}
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            onClick={() => handleClose()}
            sx={{ color: "white" }}
          >
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContactList;
