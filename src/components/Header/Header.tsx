import { Box, Button, Grid } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch } from "react-redux";
import { PrevPage } from "../../store/dataSlice";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <div className='h-12 py-1 px-2 justify-center'>
      <Grid className='h-10 items-center' container>
        <Grid item className='w-10 flex justify-center' xs={1}>
          <button onClick={() => dispatch(PrevPage())}>
            <ArrowBackIcon />
          </button>
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
