import { Box, Button, Typography } from "@mui/material";
import React from "react";
import SocialLogin from "./SocialLogin/SocialLogin";
import SocialLogout from "./SocialLogin/SocialLogout";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <Box>
      <Typography variant='h2'>LandingPage - 입니다</Typography>
      <Button href='/regist'>RegistPage</Button>
      <SocialLogin />
      <SocialLogout />
    </Box>
  );
};

export default LandingPage;
