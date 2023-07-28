import { Slide } from "@mui/material";
import RegistUserTag from "./subComponents/RegistUserTag";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import RegistUserInfo from "./subComponents/RegistUserInfo";
import RegistUserType from "./subComponents/RegistUserType";
import RegistSuccess from "./subComponents/RegistSuccess";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const RegistComponent = () => {
  const view = useSelector((state: RootState) => state.view.currentView);
  const page = useSelector((state: RootState) => state.view.page);
  const prevPage = useSelector((state: RootState) => state.view.prevPage);
  const methods = useForm<registRegister>();
  const onSubmit: SubmitHandler<registRegister> = (data) =>
    alert(JSON.stringify(data));
  const transitionClass = "absolute left-0 right-0 h-full";
  return (
    <Slide direction='left' in={view === "Regist"}>
      <div className='absolute flex flex-col w-full h-full justify-between'>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                <RegistUserType />
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
                <RegistUserInfo />
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
                <RegistUserTag formElement={"PlannerTag"} />
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
        </FormProvider>
      </div>
    </Slide>
  );
};

export default RegistComponent;
