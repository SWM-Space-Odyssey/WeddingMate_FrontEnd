import { useDispatch } from "react-redux";
import { CountryList } from "../../../../common/CountryLIst";
import CustomInput from "../../../Modules/CustomInput";

import CustomTagBlock from "../../../Modules/CustomTagBlock";
import { Button } from "@mui/material";
import { NextPage } from "../../../../store/viewSlice";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import CustomText from "../../../Modules/CustomText";

const RegistUserInfo = () => {
  const dispatch = useDispatch();
  const { control, formState } = useFormContext();
  const [flag, setFlag] = useState<boolean>(true);
  const stateMapping: MappingInterface<registStates, registRegister> = {
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
  const regionList2 = useWatch({
    name: "regionList",
  });

  return (
    <div className='px-4 flex flex-col h-full justify-between'>
      <div className='flex flex-col mt-20 gap-y-7'>
        <CustomInput content={stateMapping.userNickname} />
        <CustomInput content={stateMapping.userCompany} />
        <CustomInput content={stateMapping.userGrade} />
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
      <Button
        className='h-11 w-full'
        variant='contained'
        sx={{ fontSize: "1rem", my: 1, color: "white" }}
        onClick={() => {
          dispatch(NextPage());
        }}
        disabled={
          regionList2?.length > 0 && position && company && nickname
            ? false
            : true
        }
      >
        다음
      </Button>
    </div>
  );
};

export default RegistUserInfo;
