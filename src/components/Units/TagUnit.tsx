import { Chip } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Props<T extends registStateStrings | portfolioStateStrings> {
  text: string;
  tagState: [string[], React.Dispatch<React.SetStateAction<string[]>>];
  formElement: T;
  tagCountMax: number;
}

const TagUnit = <T extends registStateStrings | portfolioStateStrings>(
  props: Props<T>
) => {
  const { register } = useFormContext();
  const [value, setValue] = props.tagState;
  const text = props.text;
  const formElement = props.formElement;
  const tagCountMax = props.tagCountMax;

  const onClickHandler = () => {
    let newValue = [];
    if (value.length < tagCountMax) {
      if (value.includes(text)) {
        const targetIndex = value.indexOf(text);
        value.splice(targetIndex, 1);
        newValue = [...value];
      } else {
        newValue = [...value, text];
      }
    } else {
      if (value.includes(text)) {
        const targetIndex = value.indexOf(text);
        value.splice(targetIndex, 1);
        newValue = [...value];
      } else {
        newValue = [...value.slice(1), text];
      }
    }
    register(formElement, { value: [...newValue] } as any);
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

export default TagUnit;
