import { UseFormRegister, useFormContext, useWatch } from "react-hook-form";
import CustomText from "./CustomText";

interface Props<T extends stateLiteral> {
  content: {
    state: T;
    title: string;
    placeholder: string;
    multiline?: boolean;
    textCount?: boolean;
  };
}

const CustomInput = <T extends stateLiteral>(props: Props<T>) => {
  const { register, control } = useFormContext();
  const multiLine = props.content.multiline ? true : false;
  const state = props.content.state;
  let textCount: string = "";
  if (state === "itemRecord") {
    textCount = useWatch({
      control,
      name: "itemRecord",
    });
  }

  return (
    <div className='flex flex-col'>
      <div className='mb-1'>
        <CustomText type='Title' text={props.content.title} />
      </div>
      {multiLine && state === "itemRecord" ? (
        <div>
          <textarea
            className='border w-full resize-none h-20 px-3 py-2.5'
            {...register(props.content.state)}
            placeholder={props.content.placeholder}
            maxLength={500}
          />
          <div className='flex justify-end'>
            <CustomText
              type='Description'
              text={`${textCount?.length ?? 0}/500`}
            />
          </div>
        </div>
      ) : (
        <input
          multiple
          className='border rounded-sm w-full py-2.5 px-3'
          placeholder={props.content.placeholder}
          type='text'
          {...register(props.content.state)}
        />
      )}
    </div>
  );
};

export default CustomInput;
