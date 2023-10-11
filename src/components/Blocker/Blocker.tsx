import React, { ReactElement, useState } from "react";
import CustomText from "../Modules/CustomText";
import { usePortfolioCheck, usePortfolioDetail } from "../../api/portfolio";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type Props = {
  SpecificComponent: () => JSX.Element;
};

const Blocker = (props: Props) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { status, data } = usePortfolioCheck(0, true);
  if (status === "success" && data?.status === "SUCCESS") {
    if (data?.data.length === 0) {
      return (
        <div className='center pb-40'>
          <div className='text-[10rem]'>🙇</div>
          <CustomText type='Title-large' text='글을 최소 한 개 이상' />
          <CustomText
            type='Title-large'
            text='작성하셔야 열람하실 수 있습니다!'
          />
        </div>
      );
    }
    const { status: detailStatus, data: detailData } = usePortfolioDetail(
      data?.data[0]?.portfolioId ?? 0
    );
    if (
      detailStatus === "success" &&
      detailData.status === "SUCCESS" &&
      detailData.data.itemResDtoList.length === 0
    ) {
      return (
        <div className='center pb-40'>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>글 작성을 마무리 해 주세요!</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ fontSize: "0.9rem" }}>
                확인해보니,
                <br />
                작성하신 글이 아직 마무리되지 않았어요!
                <br />
                아이템까지 작성을 마무리하시면
                <br />
                열람하실 수 있습니다.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>알았어요!</Button>
            </DialogActions>
          </Dialog>
          <div className='text-[10rem]'>🙇</div>
          <CustomText
            type='Title-large'
            text='아직 글 작성이 마무리되지 않았어요!'
          />
          <CustomText
            type='Title-large'
            text='작성하셔야 열람하실 수 있습니다!'
          />
          <Button onClick={handleClickOpen}>전 작성했는데요??</Button>
        </div>
      );
    }
  } else {
    return <props.SpecificComponent />;
  }
};

export default Blocker;
