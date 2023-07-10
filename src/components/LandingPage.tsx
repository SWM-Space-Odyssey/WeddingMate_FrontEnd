import { Box, Button, Typography } from "@mui/material";
import React from "react";
import SocialLogin from "./SocialLogin/SocialLogin";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <Box>
      <Typography variant='h2'>LandingPage - 입니다</Typography>
      <Button href='/regist'>RegistPage</Button>
      <SocialLogin />
    </Box>
  );
};

export default LandingPage;
