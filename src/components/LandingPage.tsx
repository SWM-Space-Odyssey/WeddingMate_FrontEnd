import { Box, Button, Typography } from "@mui/material";
import React from "react";
import SocialLogin from "./SocialLogin/SocialLogin";
import SocialLogout from "./SocialLogin/SocialLogout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ReduxLogin, ReduxLogout } from "../store/userSlice";
import Header from "./Header/Header";
import RegistComponent from "./Regist/RegistComponent";
import RegistUserType from "./Regist/RegistUserType";

type Props = {};

const LandingPage = (props: Props) => {
  const user = useSelector((state: RootState) => state.user.nickname);
  const dispatch = useDispatch();
  return (
    <Box className='h-full flex flex-col'>
      <Header />
      {/* <Typography variant='h2'>LandingPage - 입니다</Typography>
      <Button href='/regist'>RegistPage</Button> */}
      <div className='flex-1'>
        <RegistComponent />
      </div>
      {/* <SocialLogin />
      <SocialLogout /> */}
      {/* <Typography>REDUX Value : {user}</Typography>
      <Button onClick={() => dispatch(ReduxLogin())}>Login</Button>
    <Button onClick={() => dispatch(ReduxLogout())}>LogOut</Button> */}
    </Box>
  );
};

export default LandingPage;
