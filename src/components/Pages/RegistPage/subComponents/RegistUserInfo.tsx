import { useDispatch } from "react-redux";
import { CountryList } from "../../../../store/CountryLIst";
import CustomInput from "../../../Modules/CustumInput";

import CustomTagBlock from "../../../Modules/CustomTagBlock";
import { Button } from "@mui/material";
import { NextPage } from "../../../../store/dataSlice";

const RegistUserInfo = () => {
  const dispatch = useDispatch();
  const stateMapping: MappingInterface<registStates, registRegister> = {
    userNickname: {
      state: "Nickname",
      title: "닉네임",
      placeholder: "사용할 닉네임을 입력해주세요",
    },
    userCompany: {
      state: "Company",
      title: "소속",
      placeholder: "웨딩 플래너님의 소속을 입력해주세요",
    },
    userGrade: {
      state: "Grade",
      title: "직급",
      placeholder: "사원, 대리, 과장 등",
    },
  };

  return (
    <div className='px-4 flex flex-col h-full justify-between'>
      <div className='flex flex-col mt-7 gap-y-7'>
        <CustomInput content={stateMapping.userNickname} />
        <CustomInput content={stateMapping.userCompany} />
        <CustomInput content={stateMapping.userGrade} />
        <div>
          <div className='font-bold mb-1'>지역</div>
          <CustomTagBlock spreadValues={CountryList} formState={"Location"} />
        </div>
      </div>
      <Button
        className='h-11 w-full'
        variant='outlined'
        sx={{ fontSize: "1rem", my: 1 }}
        onClick={() => {
          dispatch(NextPage());
        }}
      >
        다음
      </Button>
    </div>
  );
};

export default RegistUserInfo;