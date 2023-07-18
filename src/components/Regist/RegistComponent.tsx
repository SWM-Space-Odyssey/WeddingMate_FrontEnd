import React, { useCallback, useRef, useState } from "react";
import { Button } from "@mui/material";
import BottomButton from "../Units/BottomButton";
import RegistUserType from "./RegistUserType";
import RegistUserInfo from "./RegistUserInfo";
type body = {
  type: string;
  nickname: string | null;
  location: string | null;
  company?: string | null;
  grade?: string | null;
};
const RegistComponent = () => {
  const [userType, setUserType] = useState<string>("");
  const Nickname = useRef<HTMLInputElement>(null);
  const Company = useRef<HTMLInputElement>(null);
  const Grade = useRef<HTMLInputElement>(null);
  const [Location, setLocation] = useState<string>("");
  const [body, setBody] = useState<body>({
    type: userType,
    nickname: "",
    location: "",
  });
  const updateBody = () => {};

  const userInfoState: userInfoRef = {
    Nickname: Nickname,
    Company: Company,
    Grade: Grade,
    Location: [Location, setLocation],
  };
  return (
    <>
      <Button
        sx={{ position: "absolute" }}
        onClick={() => {
          console.log(
            userType,
            // userNickname,
            // userLocation,
            // userDate,
            // userGrade,
            // userCompany
            Nickname.current!.value,
            Company.current!.value,
            Grade.current!.value,
            Location
          );
        }}
      >
        TEST
      </Button>
      {/* <RegistUserType Type={[userType, setUserType]} /> */}
      <RegistUserInfo userInfoState={userInfoState} />
    </>
  );
};

export default RegistComponent;
