import React from "react";
import PortfolioHeader from "./subComponents/PortfolioHeader";
import { Button } from "@mui/material";
import ItemCreate from "../ItemPage/ItemCreate";

type Props = {};

const PortfolioPage = (props: Props) => {
  return (
    <div>
      {/* <div>
        <PortfolioHeader />
      </div>
      <div className='mt-12'>
        <Button sx={{ height: "38px", width: "100%" }} variant='outlined'>
          아이템 추가하기
        </Button>
      </div> */}
      <ItemCreate />
    </div>
  );
};

export default PortfolioPage;
