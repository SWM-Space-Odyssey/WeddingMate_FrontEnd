import { Button } from "@mui/material";
import React from "react";

type props = {
  text: string;
  flag: boolean;
  bottom?: number;
};
const BottomButton = (props: props) => {
  return (
    <Button
      className='h-11 w-full'
      variant='outlined'
      sx={{ fontSize: "1rem", my: 1 }}
      disabled={props.flag}
    >
      {props.text}
    </Button>
  );
};

export default BottomButton;
