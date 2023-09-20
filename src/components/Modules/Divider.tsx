import { Box } from "@mui/material";
import React from "react";

type Props = {
  height: number;
};

const Divider = (props: Props) => {
  return (
    <Box sx={{ height: props.height * 4, width: "100%", bgcolor: "#F5F5F5" }} />
  );
};

export default Divider;
