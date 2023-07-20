import { Button } from "@mui/material";
import RegistUserTag from "./subComponents/RegistUserTag";
import { SubmitHandler, useForm } from "react-hook-form";
import RegistUserInfo from "./subComponents/RegistUserInfo";
import RegistUserType from "./subComponents/RegistUserType";
import { useState } from "react";
import RegistSuccess from "./subComponents/RegistSuccess";

const RegistComponent = () => {
  const [userType, setUserType] = useState("");
  const { register, handleSubmit } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = (data) =>
    alert(JSON.stringify(data));

  const useFormFunctions: useFormFuctnionType = {
    register: register,
  };
  return (
    <div className='px-4 flex flex-col h-full justify-between'>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <RegistUserType useFormFunctions={useFormFunctions} /> */}
        {/* <RegistUserInfo useFormFunctions={useFormFunctions} /> */}
        {/* <RegistUserTag
          useFormFunctions={useFormFunctions}
          formElement={"PlannerTag"}
        /> */}
        <RegistSuccess />
        <Button sx={{ position: "absolute" }} type='submit'>
          CHECK FORM
        </Button>
      </form>
    </div>
  );
};

export default RegistComponent;
