import { Box, Grid } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Header = () => {
  return (
    <div className='h-12 py-1 px-2 justify-center'>
      <Grid className='h-10 items-center' container>
        <Grid item className='w-10 flex justify-center' xs={1}>
          <ArrowBackIcon />
        </Grid>
        <Grid item xs={10}>
          <div>로그인</div>
        </Grid>
        <Grid item xs={1}>
          <div>IC</div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
