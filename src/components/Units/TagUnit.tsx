import { Chip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";

type Props = {
  text: string;
  // flag: boolean;
  register: UseFormRegister<FormInput>;
  tagState: [string, React.Dispatch<React.SetStateAction<string>>];
  formElement: stateStrings;
  // watch: UseFormWatch<globalThis.FormInput>;
};

// selected logic, text, state function
const TagUnit = (props: Props) => {
  const [value, setValue] = props.tagState;
  const register = props.register;
  const text = props.text;
  const formElement = props.formElement;
  const onClickHandler = () => {
    setValue(text);
    register(formElement, { value: text });
  };
  const selected = "font-bold";
  return (
    <Chip
      label={text}
      onClick={() => {
        onClickHandler();
      }}
      className={`${value === text ? selected : ""}`}
    />
  );
};

export default React.memo(TagUnit);
