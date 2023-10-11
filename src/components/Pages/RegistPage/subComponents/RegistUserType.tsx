import React, { useState } from "react";
import { Button, Radio, Stack } from "@mui/material";
import { NextPage } from "../../../../store/viewSlice";
import { useDispatch } from "react-redux";
import { useFormContext, useWatch } from "react-hook-form";
import { setUserType } from "../../../../store/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import * as amplitude from "@amplitude/analytics-browser";

const RegistUserType = () => {
  const dispatch = useDispatch();
  const userType = useSelector((state: RootState) => state.user.type);
  const { register, reset } = useFormContext();
  // 사용되는 상수구역
  const GuideText = "가입 유형을 선택해주세요";
  const CoupleString = "couple";
  const PlannerString = "planner";
  const stringMapping = {
    couple: "예비부부 회원가입",
    planner: "플래너 회원가입",
  };
  const buttonClass = "text-sm w-full";

  const onClickHandler = (type: typeof CoupleString | typeof PlannerString) => {
    reset();
    register("type", { value: type });
    dispatch(setUserType(type));
  };

  const buttonComponent = (
    str: typeof CoupleString | typeof PlannerString
  ): JSX.Element => {
    return (
      <Button
        className={buttonClass}
        variant='outlined'
        onClick={() => onClickHandler(str)}
        disabled={str === PlannerString ? true : false}
        sx={{
          display: "flex",
          fontWeight: `${userType === str ? 700 : 400}`,
          justifyContent: "flex-start",
        }}
      >
        <Radio disableRipple size='small' checked={userType === str} />
        <div
          className={`${userType === str ? "text-black" : "text-slate-500"}`}
        >
          {stringMapping[str]}
        </div>
      </Button>
    );
  };

  return (
    <div className='flex flex-col px-4 h-full justify-between'>
      <div className='mt-6'>
        <div className='font-bold text-2xl'>{GuideText}</div>
        <Stack spacing={1} className='mt-6'>
          {buttonComponent(CoupleString)}
          {/* {buttonComponent(PlannerString)} */}
        </Stack>
      </div>
      <Button
        className='h-11 w-full'
        variant='contained'
        sx={{ fontSize: "1rem", my: 1, color: "white" }}
        disabled={userType ? false : true}
        onClick={() => {
          amplitude.track("regist_step1");
          dispatch(NextPage());
        }}
      >
        선택 완료
      </Button>
    </div>
  );
};

export default RegistUserType;
