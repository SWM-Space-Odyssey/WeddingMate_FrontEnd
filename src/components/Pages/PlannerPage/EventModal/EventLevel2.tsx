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
import { useDispatch } from "react-redux";
import { setGuide } from "../../../../store/userSlice";

type Props = {};

const EventLevel2 = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (flag?: boolean) => {
    setOpen(false);
  };
  return (
    <Dialog open={open}>
      <DialogTitle>
        <div className='center'>
          <CustomText type='Title-large' text='🎉  웨딩메이트 오픈이벤트  🎉' />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className='flex flex-col gap-1 center'>
          <CustomText type='Title-large' text='💦 거의 다 왔습니다! 💦' />
          <div>
            <CustomText type='Title' text='게시물 그룹을 생성하셨군요!' />
          </div>
          <br />
          <div className='flex flex-col center'>
            <CustomText type='Title' text='새로 생성된 그룹에서' />
            <Button fullWidth variant='outlined'>
              아이템 추가하기
            </Button>
            <CustomText
              type='Title'
              text='버튼을 눌러 게시물을 작성해주세요!'
            />
          </div>
          <br />
          <div>
            <CustomText type='Title' text='작성을 완료해주시면... ?' />
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
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} variant='contained'>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventLevel2;
