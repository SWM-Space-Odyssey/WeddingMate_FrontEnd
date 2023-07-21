import { Slide } from "@mui/material";
import RegistUserTag from "./subComponents/RegistUserTag";
import { SubmitHandler, useForm } from "react-hook-form";
import RegistUserInfo from "./subComponents/RegistUserInfo";
import RegistUserType from "./subComponents/RegistUserType";
import RegistSuccess from "./subComponents/RegistSuccess";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const RegistComponent = () => {
  const page = useSelector((state: RootState) => state.data.page);
  const prevPage = useSelector((state: RootState) => state.data.prevPage);
  const { register, handleSubmit } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = (data) =>
    alert(JSON.stringify(data));

  const useFormFunctions: useFormFuctnionType = {
    register: register,
  };
  const transitionClass = "absolute w-full h-full";
  return (
    <div className='flex flex-col w-full h-full justify-between'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Slide
          direction={
            page === 0
              ? prevPage < 0
                ? "left"
                : "right"
              : prevPage < 0
              ? "left"
              : "right"
          }
          in={page === 0}
        >
          <div className={transitionClass}>
            <RegistUserType useFormFunctions={useFormFunctions} />
          </div>
        </Slide>
        <Slide
          direction={
            page === 1
              ? prevPage < 1
                ? "left"
                : "right"
              : page > 1
              ? "right"
              : "left"
          }
          in={page === 1}
        >
          <div className={transitionClass}>
            <RegistUserInfo useFormFunctions={useFormFunctions} />
          </div>
        </Slide>

        <Slide
          direction={
            page === 2
              ? prevPage < 2 // 들어올 때
                ? "left"
                : "right"
              : page > 2 // 나갈 때
              ? "right"
              : "left"
          }
          in={page === 2}
        >
          <div className={transitionClass}>
            <RegistUserTag
              useFormFunctions={useFormFunctions}
              formElement={"PlannerTag"}
            />
          </div>
        </Slide>
        <Slide
          direction={
            page === 3
              ? prevPage < 3
                ? "left"
                : "right"
              : page < 3
              ? "left"
              : "right"
          }
          in={page === 3}
        >
          <div className={transitionClass}>
            <RegistSuccess />
          </div>
        </Slide>
      </form>
    </div>
  );
};

export default RegistComponent;
