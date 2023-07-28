import React, { useState } from "react";
import PortfolioHeader from "./subComponents/PortfolioHeader";
import { Button, Slide } from "@mui/material";
import ItemCreate from "../ItemPage/ItemCreate";
import PortfolioItemCard from "./subComponents/PortfolioItemCard";

type Props = {};

const PortfolioPage = (props: Props) => {
  const [createIn, setCreateIn] = useState(false);
  return (
    <div className='relative w-full'>
      <Slide direction='right' in={!createIn}>
        <div className='absolute w-full'>
          <div>
            <PortfolioHeader />
          </div>
          <div className='mt-12'>
            <Button
              onClick={() => setCreateIn(true)}
              sx={{ height: "38px", width: "100%" }}
              variant='outlined'
            >
              아이템 추가하기
            </Button>
          </div>
          <div className='mt-3'>
            <PortfolioItemCard />
          </div>
        </div>
      </Slide>
      <Slide direction='left' in={createIn}>
        <div className='absolute w-full'>
          <ItemCreate close={setCreateIn} />
        </div>
      </Slide>
    </div>
  );
};

export default PortfolioPage;
