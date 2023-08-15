import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { PrevPage } from "../../store/viewSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { AccountBox, ArrowBackIos, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type Props = {
  main?: "main" | "regist";
};

const Header = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const view = useSelector((state: RootState) => state.view.viewStack);
  const page = useSelector((state: RootState) => state.view.page);
  const title = view[view.length - 1] ?? "LandingPage";
  if (props.main === "main")
    return (
      <div className='sticky h-12 py-1 px-2 justify-center border-b-2'>
        <Grid className='h-10 items-center' container>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} className='flex justify-center'>
            WEDDING MATE
          </Grid>
          <Grid item xs={1}>
            <button onClick={() => navigate("/planner")}>
              <AccountBox />
            </button>
          </Grid>
        </Grid>
      </div>
    );
  if (props.main === "regist") {
    return (
      <div className='sticky h-12 py-1 px-2 justify-center border-b-2'>
        <Grid className='h-10 items-center' container>
          <Grid item xs={1}>
            <button
              type='button'
              onClick={() => {
                console.log("page", page);
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
              <ArrowBackIos />
            </button>
          </Grid>
          <Grid item xs={10} className='flex justify-center'>
            {page < 3 && (
              <Typography>
                회원가입 ({page + 1}/{3})
              </Typography>
            )}
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
    );
  }
  return (
    <div className='sticky h-12 py-1 px-2 justify-center'>
      <Grid className='h-10 items-center' container>
        <Grid item className='w-10 flex justify-center' xs={1}>
          <button
            type='button'
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
