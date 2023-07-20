import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import TagUnit from "./TagUnit";

type Props = {
  spreadValues: string[];
  register: UseFormRegister<FormInput>;
  formElement: stateStrings;
  tagCountMax?: number;
};

const TagComponent = (props: Props) => {
  const spreadValues = props.spreadValues;
  const register = props.register;
  const formElement = props.formElement;
  const tagCountMax = props.tagCountMax ? props.tagCountMax : 1;
  const [componentValue, setComponentValue] = useState<string[]>([]);
  return (
    <div className='flex flex-wrap gap-1.5'>
      {spreadValues.map((item, index) => (
        <TagUnit
          key={index}
          text={item}
          register={register}
          formElement={formElement}
          tagCountMax={tagCountMax}
          tagState={[componentValue, setComponentValue]}
        />
      ))}
    </div>
  );
};

export default TagComponent;
