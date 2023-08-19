import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { tokenRefresh, userCheck } from "../api/user";

type option = "all" | "planner" | "customer" | "unregistered";
const Auth = (Component: FC<any>, option: option) => (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const RefreshToken = async (accessToken: string) => {
    const { status, data } = await tokenRefresh(accessToken);
    if (status === 200) {
      localStorage.setItem("accessToken", data.accessToken);
      navigate(0);
      return;
    } else {
      alert("오류가 발생했습니다! 다시 로그인해주세요");
      localStorage.removeItem("accessToken");
      navigate("/login");
      return;
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const admin = localStorage.getItem("admin");
    // 지금은 매번 요청을 하고 나중엔 만료시간을 만들어두는건 어떨까?
    if (accessToken && !admin) {
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
                  alert("플래너만 사용할 수 있는 기능입니다.");
                  navigate("/");
                }
                break;
              case "UNREGISTERED":
                if (option === "all" || option === "customer") {
                } else {
                  navigate("/regist");
                }
                break;
            }
          } else {
            // 토큰이 만료된 경우
            if (res.status === 401) {
              RefreshToken(accessToken);
            }
          }
        })
        .catch((err) => {
          // 토큰이 만료된 경우
          RefreshToken(accessToken);
        });
    } else {
      if (admin) return;
      if (option === "all") return;
      alert("로그인이 만료되었습니다! 다시 로그인해주세요.");
      navigate("/login");
    }
  }, []);

  return <Component {...props} />;
};

export default Auth;
