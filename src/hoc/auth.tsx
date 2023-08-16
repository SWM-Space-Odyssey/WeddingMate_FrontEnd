// import React,{FC} from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../store/store";
// import { tokenRefresh } from "../api/user";
// import { useNavigate } from "react-router-dom";

/**
 * 가능한 경우의 수
 * 1. 로그인이 되어있는 경우
 * 1.1 로그인이 되어있는 경우에는 회원가입 페이지로 이동하면 안된다.
 * 1.2 플래너인 경우
 * 1.3 일반 유저인 경우
 * 1.4 회원가입이 안되어있는 경우
 * 2. 로그인이 안되어있는 경우
 * 2.1 피드가 아닌데 로그인이 안되어있는 경우 피드로 이동
 * 2.2 피드인데 로그인이 안되어있는 경우 우선 보내고 피드에서 검증
 */

import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { tokenRefresh, userCheck } from "../api/user";

type option = "all" | "planner" | "customer" | "unregistered";
const Auth = (Component: FC<any>, option: option) => (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { type } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    // 지금은 매번 요청을 하고 나중엔 만료시간을 만들어두는건 어떨까?
    if (accessToken) {
      userCheck(accessToken)
        .then((res) => {
          if (res.status === 200) {
            const type = res.data.data;
            // dispatch({ type: "SET_PLANNER", payload: { type } });
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
                navigate("/regist");
                break;
            }
          }
        })
        .catch((err) => {
          tokenRefresh(accessToken).then((res) => {
            if (res.status === 200) {
              localStorage.setItem("accessToken", res.data.accessToken);
              navigate(0);
              return;
            }
          });
          alert("오류가 발생했습니다! 다시 로그인해주세요");
          localStorage.removeItem("accessToken");
          navigate("/login");
        });
    } else {
      alert("로그인이 만료되었습니다! 다시 로그인해주세요.");
      navigate("/login");
    }
  }, []);

  return <Component {...props} />;
};

export default Auth;

// type AuthProps = {
//   SpecificComponent: FC;
//   option: "all" | "planner" | "couple";
//   adminRoute?: boolean;
// };

// const AUTH:FC<AuthProps>({SpecificComponent, option, adminRoute}) {
//   const { SpecificComponent, option, adminRoute } = props;
//   const navigate = useNavigate();
//   function AuthenticationCheck(props: any) {
//     let user = useSelector((state: RootState) => state.user);
//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//       user = JSON.parse(accessToken);
//     } else {
//       alert("로그인이 만료되었습니다! 다시 로그인해주세요.");
//     }

//     return <SpecificComponent {...props} user={user} />;
//   }

//   return <div>auth</div>;
// }
