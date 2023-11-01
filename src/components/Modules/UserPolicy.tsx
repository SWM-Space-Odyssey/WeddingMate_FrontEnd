import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Modal,
} from "@mui/material";
import React from "react";
import ChannelService from "../../hooks/ChannelService";

type Props = {};

const UserPolicy = (props: Props) => {
  const imageList = [1, 2, 3, 4, 5, 6, 7];
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const BASE_URL =
    "https://weddingmate-bucket.s3.ap-northeast-2.amazonaws.com/userPolicy/servicePolicy_";
  return (
    <>
      <Button sx={{ color: "black" }} onClick={() => setOpen(true)}>
        서비스 이용약관 확인
      </Button>
      <Dialog open={open} scroll={scroll}>
        <DialogTitle>서비스 이용약관</DialogTitle>
        <DialogContent dividers>
          {imageList.map((item, index) => {
            return (
              <img
                src={`${BASE_URL}${item}.webp`}
                alt='userPolicy'
                key={index}
                className='w-full h-auto'
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>확인</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserPolicy;
