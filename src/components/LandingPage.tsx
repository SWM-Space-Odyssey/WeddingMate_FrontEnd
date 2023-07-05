import { Box, Button, Typography } from "@mui/material";
import React from "react";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <Box>
      <Typography variant='h2'>LandingPage - 입니다</Typography>
      <Button href='/regist'>RegistPage</Button>
    </Box>
  );
};

export default LandingPage;
