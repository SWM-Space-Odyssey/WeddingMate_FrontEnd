import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { PrevPage } from "../../store/viewSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ArrowBackIos, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const view = useSelector((state: RootState) => state.view.viewStack);
  const title = view[view.length - 1] ?? "LandingPage";
  return (
    <div className='sticky h-12 py-1 px-2 justify-center'>
      <Grid className='h-10 items-center' container>
        <Grid item className='w-10 flex justify-center' xs={1}>
          <button
            onClick={() => {
              dispatch(PrevPage());
              navigate(-1);
            }}
          >
            <ArrowBackIos />
          </button>
        </Grid>
        <Grid item xs={10}>
          <div>{title}</div>
        </Grid>
        <Grid item xs={1}>
          <button onClick={() => console.log("특수키")}>
            <Settings />
          </button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
