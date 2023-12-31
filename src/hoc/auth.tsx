import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { tokenRefresh, userCheck } from "../api/user";
import { getAccessToken, useUUID } from "../hooks/apiHook";
import * as amplitude from "@amplitude/analytics-browser";
import {
  resetAccessToken,
  setAccessToken,
  setReportTargetId,
} from "../store/userSlice";
import { useUserInfo } from "../hooks/QueryHooks";

type option = "all" | "planner" | "customer" | "unregistered" | null;
const Auth = (Component: FC<any>, option: option) => (props: any) => {
  const userId = useSelector((state: RootState) => state.user.reportTargetId);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let dep = new Date();
  if (!userId) {
    const { data, isSuccess } = useUserInfo();
    if (isSuccess) {
      dispatch(setReportTargetId(data?.data.userId));
    }
  }
  const RefreshToken = async () => {
    const response = await tokenRefresh();
    if (response && response.data.status === "SUCCESS") {
      const check = await userCheck(response.data.data.accessToken);
      if (check.status === 401) {
        dispatch(resetAccessToken());
        navigate("/login");
        return;
      }
      dispatch(setAccessToken(response.data.data.accessToken));
      navigate(0);
      return;
      // } else if (response && response.data?.status === "UNAUTHORIZED") {
      //   dispatch(resetAccessToken());
      //   navigate("/login");
      //   return;
    } else {
      dispatch(resetAccessToken());
      navigate("/login");
      return;
    }
  };

  useEffect(() => {
    const accessToken = getAccessToken();
    const admin = localStorage.getItem("admin");
    const amp = sessionStorage.getItem("amp_init");
    if (!amp) {
      sessionStorage.setItem("amp_init", "true");
      const uuid = useUUID();
      const ampId = import.meta.env.VITE_AMPLITUDE_KEY;
      amplitude.init(ampId, uuid as string, {
        defaultTracking: true,
      });
    }
    // 지금은 매번 요청을 하고 나중엔 만료시간을 만들어두는건 어떨까?

    if (accessToken) {
      if (admin) return;
      userCheck(accessToken)
        .then((res) => {
          if (res.status === 200) {
            // 토큰이 만료되지 않은 경우
            const type = res.data.data;
            switch (type) {
              case "PLANNER":
                if (option === "unregistered") {
                  alert("잘못 된 접근입니다.");
                  navigate("/");
                }
                break;
              case "CUSTOMER":
                if (option === "unregistered") {
                  alert("잘못 된 접근입니다.");
                  navigate("/");
                } else if (option === "planner") {
                  alert("사용하실 수 없는 기능입니다.");
                  navigate("/");
                }
                break;
              case "UNREGISTERED":
                if (option !== "unregistered") {
                  navigate("/regist");
                }
                break;
              default:
                console.log(option, type);
                navigate("/oauth2/error");
                break;
            }
            if (option === null) {
              alert("h");
              navigate("/");
            }
          } else {
            // 토큰이 만료된 경우
            if (res.status === 401) {
              RefreshToken();
              dep = new Date();
            }
          }
        })
        .catch((err) => {
          // 토큰이 만료된 경우
          RefreshToken();
        });
    } else {
      if (option === null) return;
      RefreshToken();
    }
  }, [dep]);

  return <Component {...props} />;
};

export default Auth;
