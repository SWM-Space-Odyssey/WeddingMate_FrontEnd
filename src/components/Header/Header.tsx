import { Box, Button, Grid, Typography, colors } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { PrevPage } from "../../store/viewSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  AccountBox,
  AccountCircle,
  ArrowBackIos,
  Settings,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { logo } from "../../assets/logo";

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
    if (props.main === "regist") {
      return (
        <button
          type='button'
          onClick={() => {
            if (page === 0) {
              if (
                confirm(
                  "이전 기록은 없어집니다. 그래도 회원가입을 중단하시겠습니까?"
                )
              ) {
                navigate(-1);
              }
            } else {
              dispatch(PrevPage());
            }
          }}
        >
          <ArrowBackIos color='secondary' />
        </button>
      );
    } else if (props.main === "main") {
      return <></>;
    } else {
      return (
        <button
          type='button'
          onClick={() => {
            dispatch(PrevPage());
            navigate(-1);
          }}
        >
          <ArrowBackIos color='secondary' />
        </button>
      );
    }
  };
  const centerContent = () => {
    if (props.main === "regist") {
      return (
        <>
          {page < 3 && (
            <Typography color={"secondary"}>
              회원가입 ({page + 1}/{3})
            </Typography>
          )}
        </>
      );
    } else {
      return logo;
    }
  };

  const rightButton = () => {
    if (props.rightButton) {
      return props.rightButton;
    }
    return <></>;
  };

  return (
    <div className='sticky h-12 py-1 px-2 justify-center border-b-2 bg-[#FF6A6A]'>
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
