import { Button } from "@mui/material";

type props = {
  text: string;
  flag: boolean;
  bottom?: number;
};
const CustomButton = (props: props) => {
  return (
    <Button
      className='h-11 w-full'
      variant='outlined'
      sx={{ fontSize: "1rem", my: 1 }}
      disabled={props.flag}
      onClick={() => {}}
    >
      {props.text}
    </Button>
  );
};

export default CustomButton;
