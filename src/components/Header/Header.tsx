import { Box, Button, Grid, Typography, colors } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { PrevPage } from "../../store/viewSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { logo } from "../../assets/logo";
import { arrow_back } from "../../assets/arrow_back";

type Props = {
  main?: "main" | "regist";
  rightButton?: JSX.Element;
};
const Header = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const view = useSelector((state: RootState) => state.view.viewStack);
  const page = useSelector((state: RootState) => state.view.page);

  const leftButton = () => {
    return (
      <button
        type='button'
        onClick={() => {
          navigate(-1);
        }}
      >
        <div>{arrow_back}</div>
        {/* <ArrowBackIos color='secondary' /> */}
      </button>
    );
  };
  const centerContent = () => {
    const type = useSelector((state: RootState) => state.user.type);
    const maxPage = type === "planner" ? 3 : 4;
    if (props.main === "regist") {
      return (
        <>
          {page < maxPage && (
            <Typography color={"secondary"}>
              회원가입 ({page + 1}/{maxPage})
            </Typography>
          )}
        </>
      );
    } else {
      return logo;
    }
  };

  const rightButton = () => {
    return <></>;
  };

  return (
    <div className='sticky h-12 py-1 px-2 justify-center'>
      <Grid className='h-10 items-center' container>
        <Grid item xs={2} className='flex justify-center'>
          {leftButton()}
        </Grid>
        <Grid item xs={8} className='flex justify-center'>
          <div onClick={() => navigate("/")} className='cursor-pointer'>
            {centerContent()}
          </div>
        </Grid>
        <Grid item xs={2} className='flex justify-center'>
          {rightButton()}
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
