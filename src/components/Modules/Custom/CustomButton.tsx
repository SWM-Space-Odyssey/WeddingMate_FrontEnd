import { Button } from "@mui/material";

type props = {
  text: string;
  flag: boolean;
  bottom?: number;
  buttonType?: "button" | "submit";
  customFunc?: React.Dispatch<React.SetStateAction<boolean>>;
};
const CustomButton = (props: props) => {
  const type = props?.buttonType;
  const customFunc = props.customFunc;
  const onClickHandler = () => {
    if (customFunc) customFunc(false);
  };
  return (
    <Button
      className='h-11 w-full'
      variant='contained'
      sx={{ fontSize: "1rem", my: 1, color: "white", borderRadius: "6px" }}
      disabled={props.flag}
      onClick={() => onClickHandler()}
      type={type}
    >
      {props.text}
    </Button>
  );
};

export default CustomButton;
