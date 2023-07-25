import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type Props = {};

/**
 * Component for Send the PermissionCode to BE after Social Login
 * @param props
 * @returns
 */
const AuthenticationPage = (props: Props) => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const KAKAO_CLIENT_ID: string = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI: string = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const KAKAO_CLIENT_SECRET: string = import.meta.env.VITE_KAKAO_CLIENT_SECRET;
  const KAKAO_PERMISSION_CODE: string | null = params.get("code"); // null 일 경우 분기처리 필요함
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${KAKAO_PERMISSION_CODE}&client_secret=${KAKAO_CLIENT_SECRET}`;
  const data = null;
  /**
   * Fix the axios URL and Logic when BE api is done
   */
  useEffect(() => {
    axios
      .post(KAKAO_AUTH_URL, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      })
      .then((response) => {
        alert("성공적으로 로그인 되었습니다.");
        console.log(response);
        navigate("/");
      });
  }, []);

  return <div>인증페이지입니다 좀만 기다려주세요</div>;
};

export default AuthenticationPage;
