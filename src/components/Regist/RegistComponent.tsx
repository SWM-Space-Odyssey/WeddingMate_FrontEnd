import React, { useCallback, useRef, useState } from "react";
import { Button } from "@mui/material";
import BottomButton from "../Units/BottomButton";
import RegistUserType from "./subComponents/RegistUserType";
import RegistUserInfo from "./subComponents/RegistUserInfo";
import RegistUserTag from "./subComponents/RegistUserTag";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
type body = {
  type: string;
  nickname: string | null;
  location: string | null;
  company?: string | null;
  grade?: string | null;
};

const RegistComponent = () => {
  const { register, handleSubmit } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = (data) =>
    alert(JSON.stringify(data));

  const useFormFunctions: useFormFuctnionType = {
    register: register,
  };
  return (
    <div className='px-4 flex flex-col h-full justify-between'>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <RegistUserType Type={[userType, setUserType]} /> */}
        {/* <RegistUserInfo useFormFunctions={useFormFunctions} /> */}
        <RegistUserTag
          useFormFunctions={useFormFunctions}
          formElement={"PlannerTag"}
        />
        <Button sx={{ position: "absolute" }} type='submit'>
          SUBMIT
        </Button>
      </form>
    </div>
  );
};

export default RegistComponent;
