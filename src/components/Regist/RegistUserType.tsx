import React, { useState } from "react";
import BottomButton from "../Units/BottomButton";
import { Button, Radio, Stack } from "@mui/material";

type Props = { Type: [string, React.Dispatch<React.SetStateAction<string>>] };

const RegistUserType = (props: Props) => {
  const [userType, setUserType] = props.Type;

  // 사용되는 상수구역
  const GuideText = "본인의 신분을 선택해주세요";
  const CoupleString = "couple";
  const PlannerString = "planner";
  const stringMapping = {
    couple: "예비부부 회원가입",
    planner: "플래너 회원가입",
  };
  const buttonClass = "text-sm w-full";

  // userType에서만 사용되는 Component여서 따로 Unit화 하지 않았습니다.
  const buttonComponent = (
    str: typeof CoupleString | typeof PlannerString
  ): JSX.Element => {
    return (
      <Button
        className={buttonClass}
        variant='outlined'
        onClick={() => setUserType(str)}
        sx={{
          display: "flex",
          fontWeight: `${userType === str ? 700 : 400}`,
          justifyContent: "flex-start",
        }}
      >
        <Radio disableRipple size='small' checked={userType === str} />
        {stringMapping[str]}
      </Button>
    );
  };

  return (
    <div className='px-4 flex flex-col h-full justify-between'>
      <div className='mt-10'>
        <div className='font-bold text-2xl'>{GuideText}</div>
        <Stack spacing={1} className='mt-10'>
          {buttonComponent(CoupleString)}
          {buttonComponent(PlannerString)}
        </Stack>
      </div>
      <BottomButton text='선택 완료' flag={userType ? false : true} />
    </div>
  );
};

export default RegistUserType;
