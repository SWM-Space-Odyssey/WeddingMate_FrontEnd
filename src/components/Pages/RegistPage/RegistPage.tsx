import { Slide } from "@mui/material";
import RegistPlannerTag from "./subComponents/RegistPlannerTag";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import RegistUserInfo from "./subComponents/RegistUserInfo";
import RegistUserType from "./subComponents/RegistUserType";
import RegistSuccess from "./subComponents/RegistSuccess";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { coupleRegister, plannerRegist } from "../../../api/user";
import { useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import {
  RegistCoupleTag1,
  RegistCoupleTag2,
} from "./subComponents/RegistCoupleTag";
import * as amplitude from "@amplitude/analytics-browser";
import { useDispatch } from "react-redux";
import { setUserNickname } from "../../../store/userSlice";
import { useEffect } from "react";

const parseArray = (data: string[]) => {
  if (data.length === 0) return "";
  else return data.join(",");
};
const RegistPage = () => {
  amplitude.track("regist_in");
  const view = useSelector((state: RootState) => state.view.currentView);
  const page = useSelector((state: RootState) => state.view.page);
  const prevPage = useSelector((state: RootState) => state.view.prevPage);
  const userType = useSelector((state: RootState) => state.user.type);
  const methods = useForm<plannerRegister | coupleRegister>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<plannerRegister | coupleRegister> = (data) => {
    if (data.type === "planner") {
      const { company, nickname, position, regionList, plannerTagList } = data;
      const planner = {
        nickname,
        company,
        position,
        regionList: regionList?.join(","),
        plannerTagList: plannerTagList?.join(","),
      };
      if (planner.regionList === "") return alert("지역을 선택해주세요");
      else if (planner.plannerTagList === "")
        return alert("태그를 선택해주세요");
      plannerRegist(planner).then((res) => {
        if (res.status === 201) {
          if (res.data.status === "conflict") {
            alert("이미 회원가입이 되어있는 계정입니다.");
          } else {
            alert("회원가입이 완료되었습니다.");
          }
          navigate("/");
        } else {
          alert("회원가입에 실패하였습니다.");
          console.log(res.data.data);
        }
      });
    } else {
      data.type = "couple";
      // 예비부부의 경우
      const {
        weddingDateConfirmed,
        weddingDate,
        region,
        nickname,
        budget,
        dressTagList,
        makeupTagList,
        plannerTagList,
        studioFocusTagList,
        studioTypeTagList,
        portfolioTagList,
      } = data;
      const date = weddingDate ? weddingDate : "미정";
      const body = {
        nickname,
        weddingDateConfirmed,
        weddingDate: date,
        regionList: parseArray(region),
        budget: parseArray(budget),
        customerTagList: {
          portfolioTagList: parseArray(portfolioTagList),
          plannerTagList: parseArray(plannerTagList),
          dressTagList: parseArray(dressTagList),
          studioTypeTagList: parseArray(studioTypeTagList),
          studioFocusTagList: parseArray(studioFocusTagList),
          makeupTagList: parseArray(makeupTagList),
        },
      };
      dispatch(setUserNickname(nickname));
      coupleRegister(body).then((res: any) => {
        if (res.status === "SUCCESS") {
          alert("회원가입이 완료되었습니다.");
          navigate("/earlyAccess");
          amplitude.track("regist_success");
        } else {
          alert("회원가입에 실패하였습니다. 모든 항목을 다시 확인해주세요!");
          amplitude.track("regist_fail", { error: res.data.data });
          navigate(0);
        }
      });
    }
  };
  const transitionClass = "absolute left-0 right-0 h-full overflow-y-scroll";

  return (
    <>
      <Slide
        className='overflow-y-scroll px-4 overflow-x-clip'
        direction='left'
        in
        mountOnEnter
        unmountOnExit
      >
        <div className='flex flex-col w-full justify-between'>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className='flex flex-col'
            >
              <Slide
                direction={
                  page === 0
                    ? prevPage < 1
                      ? "right"
                      : "right"
                    : prevPage >= 1
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
                    ? prevPage < 2
                      ? "left"
                      : "right"
                    : page >= 2
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
                  {userType === "couple" ? (
                    <RegistCoupleTag1 />
                  ) : (
                    <RegistPlannerTag formElement={"plannerTagList"} />
                  )}
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
                  {userType === "couple" ? (
                    <RegistCoupleTag2 />
                  ) : (
                    <RegistSuccess />
                  )}
                </div>
              </Slide>
              <Slide
                direction={
                  page === 4
                    ? prevPage < 4
                      ? "left"
                      : "right"
                    : page < 4
                    ? "left"
                    : "right"
                }
                in={page === 4}
              >
                <div className={transitionClass}>
                  <RegistSuccess />
                </div>
              </Slide>
            </form>
          </FormProvider>
        </div>
      </Slide>
    </>
  );
};

export default RegistPage;
