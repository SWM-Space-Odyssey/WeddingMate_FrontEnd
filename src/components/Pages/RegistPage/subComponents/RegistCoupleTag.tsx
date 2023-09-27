import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { NextPage } from "../../../../store/viewSlice";
import CustomTagBlock from "../../../Modules/CustomTagBlock";
import {
  registBudgetTagList,
  registDressTagList,
  registMakeupTagList,
  registMoodTagList,
  registPlannerTagList,
  registStudioFocusTagList,
  registStudioTypeTagList,
} from "../../../../common/RegistTagList";
import { useFormContext, useWatch } from "react-hook-form";
import * as amplitude from "@amplitude/analytics-browser";

type Props = {};

const wrapperDiv = "px-4 flex flex-col h-full justify-between";
const innerDiv = "flex flex-col mt-6 gap-y-7";

const NextButton = (disableFlag: any, text: string, submit?: boolean) => {
  const buttonText = disableFlag ? text : "태그를 선택해주세요";
  const dispatch = useDispatch();
  return (
    <Button
      className='h-11 w-full'
      variant='contained'
      sx={{ fontSize: "1rem", my: 1 }}
      disabled={!disableFlag}
      type={submit ? "submit" : "button"}
      onClick={() => {
        if (!submit) {
          amplitude.track("regist-step3");
          dispatch(NextPage());
        }
      }}
    >
      {buttonText}
    </Button>
  );
};
export const RegistCoupleTag1 = (props: Props) => {
  const { control } = useFormContext();
  const budget = useWatch({
    control,
    name: "budget",
  });
  const portfolioTagList = useWatch({
    control,
    name: "portfolioTagList",
  });
  const plannerTagList = useWatch({
    control,
    name: "plannerTagList",
  });

  const buttonFlag =
    budget &&
    portfolioTagList &&
    plannerTagList &&
    budget.length > 0 &&
    portfolioTagList.length > 0 &&
    plannerTagList.length > 0;
  return (
    <div className={wrapperDiv}>
      <div className={innerDiv}>
        <div className='font-bold text-2xl'>웨딩 플랜을 선택해주세요</div>
        <CustomTagBlock
          title='예산'
          spreadValues={registBudgetTagList}
          formState='budget'
        />
        <CustomTagBlock
          title='분위기'
          subtitle='선택한 키워드에 맞춰 플래너를 추천해드립니다!'
          maxTag={3}
          spreadValues={registMoodTagList}
          formState='portfolioTagList'
        />
        <CustomTagBlock
          title='이런 플래너를 원해요 !'
          maxTag={3}
          spreadValues={registPlannerTagList}
          formState='plannerTagList'
        />
      </div>
      {NextButton(buttonFlag, "다음")}
    </div>
  );
};
export const RegistCoupleTag2 = (props: Props) => {
  const { control } = useFormContext();

  const dressTagList = useWatch({
    control,
    name: "dressTagList",
  });
  const studioTypeTagList = useWatch({
    control,
    name: "studioTypeTagList",
  });
  const studioFocusTagList = useWatch({
    control,
    name: "studioFocusTagList",
  });
  const makeupTagList = useWatch({
    control,
    name: "makeupTagList",
  });

  const buttonFlag =
    dressTagList &&
    studioTypeTagList &&
    studioFocusTagList &&
    makeupTagList &&
    dressTagList.length > 0 &&
    studioTypeTagList.length > 0 &&
    studioFocusTagList.length > 0 &&
    makeupTagList.length > 0;
  return (
    <div className={wrapperDiv}>
      <div className={innerDiv}>
        <div className='font-bold text-2xl'>
          <div>선호하는 스/드/메 스타일을</div>
          선택해주세요
        </div>

        <CustomTagBlock
          title='드레스 소재'
          spreadValues={registDressTagList}
          formState='dressTagList'
        />
        <CustomTagBlock
          title='스튜디오 종류'
          spreadValues={registStudioTypeTagList}
          formState='studioTypeTagList'
        />
        <CustomTagBlock
          title='스튜디오 특징'
          spreadValues={registStudioFocusTagList}
          formState='studioFocusTagList'
        />
        <CustomTagBlock
          title='메이크업'
          spreadValues={registMakeupTagList}
          formState='makeupTagList'
        />
      </div>
      {NextButton(buttonFlag, "가입하기", true)}
    </div>
  );
};
