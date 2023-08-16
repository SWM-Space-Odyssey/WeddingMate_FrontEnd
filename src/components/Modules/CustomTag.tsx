import { Chip } from "@mui/material";
import React from "react";
import { FieldValues, useFormContext } from "react-hook-form";

interface Props<T extends registStates | portfolioStates | itemStates> {
  text: string;
  formState?: {
    state: T;
    tagState: [string[], React.Dispatch<React.SetStateAction<string[]>>];
  };

  tagCountMax?: number;
}
const CustomTag = <T extends registStates | portfolioStates | itemStates>(
  props: Props<T>
) => {
  const text = props.text;
  const tagCountMax = props.tagCountMax;

  // form 의 경우
  if (props.formState) {
    const { setValue } = useFormContext();
    const formState = props.formState.state;
    const [innerValue, setInnerValue] = props.formState.tagState;

    const onClickHandler = () => {
      let newValue = [];
      if (innerValue.length < (tagCountMax as number)) {
        if (innerValue.includes(text)) {
          const targetIndex = innerValue.indexOf(text);
          innerValue.splice(targetIndex, 1);
          newValue = [...innerValue];
        } else {
          newValue = [...innerValue, text];
        }
      } else {
        if (innerValue.includes(text)) {
          const targetIndex = innerValue.indexOf(text);
          innerValue.splice(targetIndex, 1);
          newValue = [...innerValue];
        } else {
          newValue = [...innerValue.slice(1), text];
        }
      }
      setValue(formState, newValue as any, { shouldDirty: true });
      setInnerValue([...newValue]);
    };

    return (
      <Chip
        label={text}
        variant='outlined'
        onClick={() => {
          onClickHandler();
        }}
        sx={{
          fontWeight: `${innerValue.includes(text) ? "bold" : ""}`,
          border: `${innerValue.includes(text) ? "2px solid" : ""}`,
          borderColor: `${innerValue.includes(text) ? "primary.main" : ""}`,
          color: `${innerValue.includes(text) ? "primary.main" : ""}`,
        }}
      />
    );
  }

  return <Chip label={`${text}`} sx={{ fontSize: "12px", height: "26px" }} />;
};

export default React.memo(CustomTag);
