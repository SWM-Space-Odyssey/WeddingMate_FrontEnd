import { Chip } from "@mui/material";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface Props<
  T extends registStateStrings | portfolioStateStrings,
  R extends portfolioFormRegister | registFormRegister
> {
  text: string;
  register: UseFormRegister<R>;
  tagState: [string[], React.Dispatch<React.SetStateAction<string[]>>];
  formElement: T;
  tagCountMax: number;
}

const TagUnit = <
  T extends registStateStrings | portfolioStateStrings,
  R extends portfolioFormRegister | registFormRegister
>(
  props: Props<T, R>
) => {
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
    register(formElement as any, { value: [...newValue] } as any);
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
