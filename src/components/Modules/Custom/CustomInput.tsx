import { UseFormRegister, useFormContext, useWatch } from "react-hook-form";
import CustomText from "./CustomText";
import { TextField } from "@mui/material";
import { useEffect } from "react";

interface Props<T extends stateLiteral> {
  content: {
    state: T;
    title: string;
    placeholder: string;
    required?: boolean;
    reqMessage?: string;
    multiline?: boolean;
    textCount?: boolean;
  };
  required?: boolean;
  validate?: number;
}

const CustomInput = <T extends stateLiteral>(props: Props<T>) => {
  const { register, control } = useFormContext();
  const isRequired = props.required ?? false;
  const state = props.content.state;
  let textCount: string = "";
  if (state === "itemRecord") {
    textCount = useWatch({
      control,
      name: "itemRecord",
    });
  } else if (state === "bio") {
    textCount = useWatch({
      control,
      name: "bio",
    });
  } else if (state === "message") {
    textCount = useWatch({
      control,
      name: "message",
    });
  } else if (state === "content") {
    textCount = useWatch({
      control,
      name: "content",
    });
  }

  const MultilineTextArea = (state: string) => {
    const textLength = {
      itemRecord: 300,
      message: 200,
      bio: 100,
      content: 500,
    };
    const validLength = props.validate ?? 0;
    if (["itemRecord", "bio", "message", "content"].includes(state)) {
      let Length: number = textLength[state as keyof typeof textLength];
      return (
        <div>
          <textarea
            className='border w-full resize-none h-20 px-3 py-2.5 invalid:border-red-500'
            {...register(state)}
            autoComplete='off'
            maxLength={Length}
            placeholder={props.content.placeholder}
          />
          <div className='flex justify-end'>
            <CustomText
              type='Description'
              text={`${textCount?.length ?? 0}/${Length}`}
            />
          </div>
        </div>
      );
    } else {
      return (
        <input
          className='border rounded-sm w-full py-2.5 px-3'
          placeholder={props.content.placeholder}
          type='text'
          autoComplete='off'
          {...register(state)}
        />
      );
    }
  };
  return (
    <div className='flex flex-col flex-1'>
      <div className='mb-1'>
        <CustomText
          type='Title'
          text={props.content.title}
          required={props?.required}
        />
      </div>
      {MultilineTextArea(state)}
    </div>
  );
};

export default CustomInput;
