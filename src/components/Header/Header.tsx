import { Box, Button, Grid } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch } from "react-redux";
import { PrevPage, intoItemCreatePage } from "../../store/viewSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Settings } from "@mui/icons-material";

const Header = () => {
  const dispatch = useDispatch();
  const view = useSelector((state: RootState) => state.view.viewStack);
  const title = view[view.length - 1] ?? "LandingPage";
  return (
    <div className='h-12 py-1 px-2 justify-center'>
      <Grid className='h-10 items-center' container>
        <Grid item className='w-10 flex justify-center' xs={1}>
          <button onClick={() => dispatch(PrevPage())}>
            <ArrowBackIcon />
          </button>
        </Grid>
        <Grid item xs={10}>
          <div>{title}</div>
        </Grid>
        <Grid item xs={1}>
          <button onClick={() => dispatch(intoItemCreatePage())}>
            <Settings />
          </button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
