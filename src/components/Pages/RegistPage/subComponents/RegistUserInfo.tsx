import { useDispatch } from "react-redux";
import { CountryList } from "../../../../common/CountryLIst";
import CustomInput from "../../../Modules/CustomInput";

import CustomTagBlock from "../../../Modules/CustomTagBlock";
import { Button, Collapse } from "@mui/material";
import { NextPage } from "../../../../store/viewSlice";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import CustomText from "../../../Modules/CustomText";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import CustomDatePicker from "../../../Modules/CustomDatePicker";
import * as amplitude from "@amplitude/analytics-browser";

const wrapperDiv = "px-4 flex flex-col h-full justify-between";
const innerDiv = "flex flex-col mt-20 gap-y-7";

const RegistUserInfo = () => {
  const dispatch = useDispatch();
  const { control, getValues, setValue } = useFormContext();
  const [flag, setFlag] = useState<boolean>(true);
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
  const coupleStateMapping: MappingInterface<
    coupleRegistStates,
    coupleRegister
  > = {
    userNickname: {
      state: "nickname",
      title: "닉네임",
      placeholder: "사용할 닉네임을 입력해주세요",
    },
    userWeddingDateConfirmed: {
      state: "weddingDateConfirmed",
      title: "예식일 확정 여부",
      placeholder: "예식일 확정 여부를 선택해주세요",
    },
    userWeddingDate: {
      state: "weddingDate",
      title: "예식일",
      placeholder: "예식일을 선택해주세요",
    },
    userRegion: {
      state: "region",
      title: "지역",
      placeholder: "예식 지역을 선택해주세요",
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
      region?.length !== 0 &&
      region !== undefined &&
      (dateConfirmed === false || (dateConfirmed === true && weddingDate)) &&
      nickname
        ? false
        : true,
  };

  const nextButton = (type: typeof userType) => (
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
            dateConfirmed !== null && !dateConfirmed ? "contained" : "outlined"
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
            />
          </Collapse>
          <CustomTagBlock
            title='예식 지역'
            spreadValues={CountryList}
            formState='region'
          />
        </div>
        {nextButton(userType)}
      </div>
    );
  }
};

export default RegistUserInfo;
