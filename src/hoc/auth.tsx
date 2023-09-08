import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { tokenRefresh, userCheck } from "../api/user";
import { getAccessToken } from "../hooks/apiHook";
import * as amplitude from "@amplitude/analytics-browser";
import { v4 as uuidv4 } from "uuid";
import { resetAccessToken, setAccessToken } from "../store/userSlice";

type option = "all" | "planner" | "customer" | "unregistered" | null;
const Auth = (Component: FC<any>, option: option) => (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let dep = new Date();
  const RefreshToken = async () => {
    // 여기가 문제인 듯?
    const response = await tokenRefresh();
    console.log(response);
    if (response && response.data.status === "SUCCESS") {
      localStorage.setItem("accessToken", response.data.accessToken);
      dispatch(setAccessToken(response.data.accessToken));
      navigate(0);
      return;
    } else {
      if (localStorage.getItem("accessToken")) {
        dispatch(resetAccessToken());
        navigate("/login");
      }
      return;
    }
  };

  useEffect(() => {
    const accessToken = getAccessToken();
    const admin = localStorage.getItem("admin");
    const uuid = localStorage.getItem("uuid");
    const amp = sessionStorage.getItem("amp_init");
    if (!uuid) {
      const uuid4 = uuidv4();
      console.log("hi", uuid4);
      localStorage.setItem("uuid", uuid4);
    }
    if (!amp) {
      sessionStorage.setItem("amp_init", "true");
      const uuid = localStorage.getItem("uuid");
      const ampId = import.meta.env.VITE_AMPLITUDE_KEY;
      amplitude.init(ampId, uuid as string);
    }
    // 지금은 매번 요청을 하고 나중엔 만료시간을 만들어두는건 어떨까?
    if (accessToken) {
      if (admin) return;
      userCheck(accessToken)
        .then((res) => {
          console.log(res.data);
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
                if (option !== "customer") {
                  navigate("/earlyAccess");
                }
                // if (option === "unregistered") {
                //   alert("잘못 된 접근입니다.");
                //   navigate("/");
                // } else if (option === "planner") {
                //   alert("플래너만 사용할 수 있는 기능입니다.");
                //   navigate("/");
                // }
                break;
              case "UNREGISTERED":
                if (option !== "unregistered") {
                  navigate("/regist");
                }
                break;
            }
            if (option === null) {
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
