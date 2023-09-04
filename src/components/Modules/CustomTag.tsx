import { Instagram } from "@mui/icons-material";
import { Chip } from "@mui/material";
import React from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Props<
  T extends registStates | portfolioStates | itemStates | plannerProfileStates
> {
  text: string;
  formState?: {
    state: T;
    tagState: [string[], React.Dispatch<React.SetStateAction<string[]>>];
  };
  type?: "sns" | "item";
  tagCountMax?: number;
}
const CustomTag = <
  T extends registStates | portfolioStates | itemStates | plannerProfileStates
>(
  props: Props<T>
) => {
  const text = props.text;
  const tagCountMax = props.tagCountMax;
  // form 의 경우
  const selectedTag = {
    fontWeight: "bold",
    boxShadow: "0 0 0 1px #FF6A6A inset",
    borderColor: "#FF6A6A",
    color: "primary.main",
  };
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
        sx={innerValue.includes(text) ? selectedTag : {}}
      />
    );
  } else if (props.type === "sns") {
    return (
      <a href={"https://instagram.com/" + text}>
        <Chip
          icon={<Instagram color='primary' />}
          label={"@" + text}
          variant='outlined'
          sx={{
            ...selectedTag,
            cursor: "pointer",
          }}
        />
      </a>
    );
  } else if (props.type === "item") {
    return (
      <Chip
        variant='outlined'
        label={`${text}`}
        sx={{ fontSize: "12px", py: "10px" }}
      />
    );
  }

  return <Chip label={`${text}`} sx={{ fontSize: "12px", height: "26px" }} />;
};

export default React.memo(CustomTag);
