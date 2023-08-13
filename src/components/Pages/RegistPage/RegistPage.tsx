import { Slide } from "@mui/material";
import RegistUserTag from "./subComponents/RegistUserTag";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import RegistUserInfo from "./subComponents/RegistUserInfo";
import RegistUserType from "./subComponents/RegistUserType";
import RegistSuccess from "./subComponents/RegistSuccess";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { plannerRegist } from "../../../api/user";
import { useNavigate } from "react-router-dom";

const RegistComponent = () => {
  const view = useSelector((state: RootState) => state.view.currentView);
  const page = useSelector((state: RootState) => state.view.page);
  const prevPage = useSelector((state: RootState) => state.view.prevPage);
  const methods = useForm<registRegister>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<registRegister> = (data) => {
    // alert(JSON.stringify(data));
    const { type, company, nickname, position, region, plannerTagList } = data;
    if (type === "planner") {
      const planner = {
        nickname,
        company,
        position,
        region: region[0],
        plannerTagList,
      };
      plannerRegist(planner).then((res) => {
        if (res.status === 200) {
          alert("회원가입이 완료되었습니다.");
          navigate("/");
        }
      });
    } else {
      // NOT YET
      // const couple = {
      //   company,
      //   nickname,
      //   position,
      //   region,
      //   plannerTagList
      // }
      // console.log(couple);
    }
  };
  const transitionClass = "absolute left-0 right-0";
  return (
    <Slide direction='left' in mountOnEnter unmountOnExit>
      <div className='flex flex-col w-full justify-between'>
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
                <RegistUserTag formElement={"plannerTagList"} />
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
