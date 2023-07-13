import { Button } from "@mui/material";
import axios from "axios";

type Props = {};

const SocialLogin = (props: Props) => {
  // const { Kakao } = window;
  const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  // https://kauth.kakao.com/oauth/authorize?client_id=2d9587c9b51c6d620ffda390ad026ab6&redirect_uri=https://localhost:8080/oauth&response_type=code

  const loginReq = () => {
    // const req = axios.post('url')

    console.log("Login Request Detected");
  };
  return (
    <div>
      SocialLogin
      <Button
        disableRipple
        sx={{
          p: 0,
          width: 184,
          height: 48,
          backgroundImage: `url('https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg')`,
          backgroundSize: "cover",
        }}
        onClick={() => loginReq()}
        href={LOGIN_URL}
      />
    </div>
  );
};

export default SocialLogin;
