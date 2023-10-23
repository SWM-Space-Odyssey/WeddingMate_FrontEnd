import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import CustomText from "../../../Modules/Custom/CustomText";
import { Edit } from "@mui/icons-material";
import * as amplitude from "@amplitude/analytics-browser";
import { useDispatch } from "react-redux";
import { setGuide } from "../../../../store/userSlice";

type Props = {};

const EventLevel1 = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (flag?: boolean) => {
    setOpen(false);
  };
  return (
    <Dialog open={open} sx={{ minWidth: "290px" }}>
      <DialogTitle>
        <div className='center'>
          <CustomText type='Title-large' text='🎉  웨딩메이트 오픈이벤트  🎉' />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className='flex flex-col gap-2'>
          <div className='center'>
            <div>
              <CustomText type='Title' text='게시물만 작성해도 ?' />
            </div>
            <div>
              <CustomText
                type='Title'
                text='⭐️추첨을 통해 신세계상품권 10만원권⭐️'
              />
            </div>
            <div>
              <CustomText
                type='Title'
                text='☕️ 100% 스타벅스 아이스아메리카노 ☕️'
              />
            </div>
          </div>
          <div className='flex items-center'>
            <a href='/create/portfolio'>
              <Button
                onClick={() => amplitude.track("OpenEvent-init")}
                variant='outlined'
                size='small'
                sx={{ mr: 1 }}
              >
                <Edit />글 쓰기
              </Button>
            </a>
            <CustomText type='Title-base' text='버튼 누르고 참여하기!' />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} variant='contained'>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventLevel1;
