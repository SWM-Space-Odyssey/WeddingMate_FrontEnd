import { useDispatch } from "react-redux";
import { CountryList } from "../../../../common/CountryLIst";
import CustomInput from "../../../Modules/Custom/CustomInput";

import CustomTagBlock from "../../../Modules/Custom/CustomTagBlock";
import { Button, Collapse } from "@mui/material";
import { NextPage } from "../../../../store/viewSlice";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import CustomText from "../../../Modules/Custom/CustomText";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import CustomDatePicker from "../../../Modules/Custom/CustomDatePicker";
import * as amplitude from "@amplitude/analytics-browser";

const wrapperDiv = "px-4 flex flex-col h-full justify-between";
const innerDiv = "flex flex-col mt-6 gap-y-7";

type Props = {
  adjust?: boolean;
};
const RegistUserInfo = (props: Props) => {
  const dispatch = useDispatch();
  const { control, getValues, setValue } = useFormContext();
  const page = useSelector((state: RootState) => state.view.page);
  const [userType, setUserType] = useState<"couple" | "planner">("couple");
  const [dateConfirmed, setDateConfirmed] = useState<boolean | null>(null);
  const plannerStateMapping: MappingInterface<
    plannerRegistStates,
    plannerRegister
  > = {
    userNickname: {
      state: "nickname",
      title: "닉네임",
      placeholder: "사용할 닉네임을 입력해주세요",
    },
    userCompany: {
      state: "company",
      title: "소속",
      placeholder: "웨딩 플래너님의 소속을 입력해주세요",
    },
    userGrade: {
      state: "position",
      title: "직급",
      placeholder: "사원, 대리, 과장 등",
    },
  };

  const nickname = useWatch({
    control,
    name: "nickname",
    defaultValue: "",
  });
  const company = useWatch({
    control,
    name: "company",
    defaultValue: "",
  });
  const position = useWatch({
    control,
    name: "position",
    defaultValue: "",
  });
  const regionList = useWatch({
    name: "regionList",
  });
  const region = useWatch({
    name: "region",
  });
  const weddingDate = useWatch({
    name: "weddingDate",
  });
  const weddingDateConfirmed = useWatch({
    control,
    name: "weddingDateConfirmed",
  });
  useEffect(() => {
    if (page === 1) {
      setUserType(getValues("type"));
    }
  }, [page]);
  useEffect(() => {
    setDateConfirmed(weddingDateConfirmed);
  }, [weddingDateConfirmed]);
  const nextButtonFlag = {
    planner:
      regionList?.length > 0 &&
      regionList !== undefined &&
      position &&
      company &&
      nickname
        ? false
        : true,
    couple:
      region !== undefined &&
      region?.length !== 0 &&
      (dateConfirmed === false || (dateConfirmed === true && weddingDate)) &&
      nickname
        ? false
        : true,
  };

  const nextButton = (type: typeof userType) => {
    if (props.adjust) {
      return (
        <Button
          className='h-11 w-full'
          type='submit'
          variant='contained'
          sx={{ fontSize: "1rem", my: 1 }}
        >
          완료
        </Button>
      );
    } else {
      return (
        <Button
          className='h-11 w-full'
          variant='contained'
          sx={{ fontSize: "1rem", my: 1 }}
          onClick={() => {
            amplitude.track("regist_step2");
            dispatch(NextPage());
          }}
          disabled={nextButtonFlag[type]}
        >
          다음
        </Button>
      );
    }
  };
  const onClickConfirmed = (flag: boolean) => {
    setDateConfirmed(flag);
    setValue("weddingDateConfirmed", flag);
  };
  const coupleDateButtonSet = (
    <div>
      <CustomText type='Title' text='예식일 확정 여부' required />
      <div className='flex justify-between pt-1 gap-1.5'>
        <Button
          className='w-1/2 h-11'
          variant={dateConfirmed ? "contained" : "outlined"}
          onClick={() => onClickConfirmed(true)}
        >
          확정함
        </Button>
        <Button
          className='w-1/2 h-11'
          variant={
            dateConfirmed !== undefined &&
            dateConfirmed !== null &&
            !dateConfirmed
              ? "contained"
              : "outlined"
          }
          onClick={() => onClickConfirmed(false)}
        >
          확정하지 않음
        </Button>
      </div>
    </div>
  );
  if (userType === "planner") {
    return (
      <div className={wrapperDiv}>
        <div className={innerDiv}>
          <CustomInput content={plannerStateMapping.userNickname} />
          <CustomInput content={plannerStateMapping.userCompany} />
          <CustomInput content={plannerStateMapping.userGrade} />
          <div>
            <CustomTagBlock
              title='지역'
              renderCounter
              spreadValues={CountryList}
              maxTag={3}
              formState={"regionList"}
            />
          </div>
        </div>
        {nextButton(userType)}
      </div>
    );
  } else {
    return (
      <div className={wrapperDiv}>
        <div className={innerDiv}>
          <CustomInput content={plannerStateMapping.userNickname} />
          {coupleDateButtonSet}
          <Collapse in={!!dateConfirmed && dateConfirmed}>
            <CustomDatePicker
              state={"weddingDate"}
              placeholder='예식 예정일을 선택해주세요'
              init={props?.adjust ? weddingDate : undefined}
            />
          </Collapse>
          <CustomTagBlock
            title='예식 지역'
            spreadValues={CountryList}
            formState='region'
            initValue={[regionList]}
          />
        </div>
        {nextButton(userType)}
      </div>
    );
  }
};

export default RegistUserInfo;
