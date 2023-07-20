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
    // setValue(text);
    if (value.length < tagCountMax) {
      setValue([...value, text]);
    } else {
      if (value.includes(text)) return;
      setValue([...value.splice(1), text]);
    }
    register(formElement, { value: [...value] });
  };
  const selected = "font-bold";
  return (
    <Chip
      label={text}
      onClick={() => {
        onClickHandler();
      }}
      className={`${value.includes(text) ? selected : ""}`}
    />
  );
};

export default React.memo(TagUnit);
