import { Chip } from "@mui/material";
import React from "react";
import { UseFormRegister } from "react-hook-form";

type Props = {
  text: string;
  register: UseFormRegister<FormInput>;
  tagState: [string[], React.Dispatch<React.SetStateAction<string[]>>];
  formElement: stateStrings;
  tagCountMax: number;
};

const TagUnit = (props: Props) => {
  const [value, setValue] = props.tagState;
  const register = props.register;
  const text = props.text;
  const formElement = props.formElement;
  const tagCountMax = props.tagCountMax;

  const onClickHandler = () => {
    let newValue = [];
    if (value.length < tagCountMax) {
      newValue = [...value, text];
    } else {
      if (value.includes(text)) return;
      newValue = [...value.splice(1), text];
    }
    register(formElement, { value: [...newValue] });
    setValue([...newValue]);
  };
  return (
    <Chip
      label={text}
      onClick={() => {
        onClickHandler();
      }}
      className={`${value.includes(text) ? "font-bold" : ""}`}
    />
  );
};

export default React.memo(TagUnit);
