import { Chip } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Props<T extends registStates | portfolioStates | itemStates> {
  text: string;
  formState?: T;
  tagCountMax?: number;
  tagState?: [string[], React.Dispatch<React.SetStateAction<string[]>>];
}
const CustomTag = <T extends registStates | portfolioStates | itemStates>(
  props: Props<T>
) => {
  const text = props.text;
  const tagCountMax = props.tagCountMax;

  // form 의 경우
  if (props.formState) {
    const { register } = useFormContext();
    const formState = props.formState;
    const [value, setValue] = props.tagState as [
      string[],
      React.Dispatch<React.SetStateAction<string[]>>
    ];

    const onClickHandler = () => {
      let newValue = [];
      if (value.length < (tagCountMax as number)) {
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
      register(formState, { value: [...newValue] } as any);
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
  }

  return <Chip label={`${text}`} sx={{ fontSize: "12px", height: "26px" }} />;
};

export default CustomTag;
