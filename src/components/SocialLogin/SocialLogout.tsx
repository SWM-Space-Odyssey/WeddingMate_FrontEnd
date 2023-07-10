import { Button } from "@mui/material";
import axios from "axios";
import React from "react";

type Props = {};

const SocialLogout = (props: Props) => {
  const resetURL = "https://kapi.kakao.com/v1/user/unlink";
  const CSKIM_ID = import.meta.env.VITE_KAKAO_CSKIM_ID;
  const MASTER_KEY = import.meta.env.VITE_KAKAO_MASTER_KEY;
  // axios.post(resetURL)
  const handleLogOut = () => {
    const body = {
      target_id_type: "user_id",
      target_id: CSKIM_ID,
    };
    const header = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `KakaoAK ${MASTER_KEY}`,
      },
    };
    axios
      .post(resetURL, body, header)
      .then((response) => {
        console.log(response);
        alert("로그아웃 성공");
      })
      .catch((err) => {
        console.log(err);
        alert("로그아웃 실패! 이미 로그아웃 되어있어요");
      });
  };

  return (
    <div>
      SocialLogout
      <Button variant='contained' onClick={() => handleLogOut()}>
        Social-Logout
      </Button>
    </div>
  );
};

export default SocialLogout;
