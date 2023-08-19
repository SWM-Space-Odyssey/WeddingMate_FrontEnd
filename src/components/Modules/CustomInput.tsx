import { UseFormRegister, useFormContext, useWatch } from "react-hook-form";
import CustomText from "./CustomText";
import { TextField } from "@mui/material";

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
  const { register, control, formState } = useFormContext();
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
  }

  const MultilineTextArea = (state: string) => {
    const itemRecordLength = 300;
    const bioLength = 100;
    const validLength = props.validate ?? 0;
    if (state === "itemRecord" || state === "bio") {
      let Length: number;
      if (state === "itemRecord") {
        Length = itemRecordLength;
      } else {
        Length = bioLength;
      }
      return (
        <div>
          <textarea
            className='border w-full resize-none h-20 px-3 py-2.5 invalid:border-red-500'
            {...register(props.content.state)}
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
          {...register(props.content.state)}
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
