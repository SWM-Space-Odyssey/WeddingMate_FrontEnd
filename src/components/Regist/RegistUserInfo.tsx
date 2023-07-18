import React, { useState } from "react";
import BottomButton from "../Units/BottomButton";
import { Button, Stack, TextField } from "@mui/material";
import TagUnit from "../Units/TagUnit";
import { CountryList } from "../../store/CountryLIst";

type inputComponentContentType = {
  title: string;
  placeholder: string;
  // state: string;
  // setState: React.Dispatch<React.SetStateAction<string>>;
  ref: React.RefObject<HTMLInputElement>;
};
type Props = {
  userInfoState: userInfoRef;
};

const RegistUserInfo = (props: Props) => {
  const Nickname = props.userInfoState.Nickname;
  const Company = props.userInfoState.Company;
  const Grade = props.userInfoState.Grade;
  const [Location, setLocation] = props.userInfoState.Location;
  const stateMapping = {
    userNickname: {
      title: "닉네임",
      placeholder: "사용할 닉네임을 입력해주세요",
      // state: userNickname,
      // setState: setUserNickname,
      ref: Nickname,
    },
    userCompany: {
      title: "소속",
      placeholder: "웨딩 플래너님의 소속을 입력해주세요",
      // state: userCompany,
      // setState: setUserCompany,
      ref: Company,
    },
    userGrade: {
      title: "직급",
      placeholder: "사원, 대리, 과장 등",
      // state: userGrade,
      // setState: setUserGrade,
      ref: Grade,
    },
  };

  const inputComponent = (content: inputComponentContentType) => {
    return (
      <div>
        <div className='font-bold mb-1'>{content.title}</div>
        <input
          className='border rounded-sm w-full py-2.5 px-3'
          placeholder={content.placeholder}
          type='text'
          ref={content.ref}
        />
      </div>
    );
  };
  return (
    <div className='px-4 flex flex-col h-full justify-between'>
      <div className='mt-10'>
        <Stack spacing={1} className='mt-10' sx={{ fontSize: "0.875rem" }}>
          {inputComponent(stateMapping.userNickname)}
          {inputComponent(stateMapping.userCompany)}
          {inputComponent(stateMapping.userGrade)}
        </Stack>
        <div className='flex flex-wrap'>
          {CountryList.map((item, index) => {
            return (
              <TagUnit
                key={index}
                flag={Location === item ? true : false}
                text={item}
                setState={setLocation}
              />
            );
          })}
        </div>
      </div>

      <BottomButton
        text='선택 완료'
        flag={Location && Nickname && Company && Grade ? false : true}
      />
    </div>
  );
};

export default RegistUserInfo;
