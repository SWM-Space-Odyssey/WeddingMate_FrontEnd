import React, { useState } from "react";
import { Button } from "@mui/material";
import BottomButton from "../Units/BottomButton";
import RegistUserType from "./RegistUserType";

const RegistComponent = () => {
  const [userType, setUserType] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userLocation, setUserLocation] = useState<string>("");
  const [userDate, setUserDate] = useState<string>("");
  const [userExperience, setUserExperience] = useState<number>(0);
  const [userCompany, setUserCompany] = useState<string>("");

  return (
    <>
      <Button
        sx={{ position: "absolute" }}
        onClick={() => {
          console.log(
            userType,
            userName,
            userLocation,
            userDate,
            userExperience,
            userCompany
          );
        }}
      >
        TEST
      </Button>
      <RegistUserType state={[userType, setUserType]} />
    </>
  );
};

export default RegistComponent;
