import { Button } from "@mui/material";

type props = {
  text: string;
  flag: boolean;
  bottom?: number;
  buttonType?: "button" | "submit";
};
const CustomButton = (props: props) => {
  const type = props?.buttonType;
  return (
    <Button
      className='h-11 w-full'
      variant='outlined'
      sx={{ fontSize: "1rem", my: 1 }}
      disabled={props.flag}
      onClick={() => {}}
      type={type}
    >
      {props.text}
    </Button>
  );
};

export default CustomButton;
