import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import TagUnit from "./TagUnit";

type Props = {
  spreadValues: string[];
  register: UseFormRegister<FormInput>;
  formElement: stateStrings;
};

const TagComponent = (props: Props) => {
  const spreadValues = props.spreadValues;
  const register = props.register;
  const formElement = props.formElement;
  const [componentValue, setComponentValue] = useState("");
  return (
    <div className='flex flex-wrap gap-1.5'>
      {spreadValues.map((item, index) => (
        <TagUnit
          key={index}
          text={item}
          register={register}
          formElement={formElement}
          tagState={[componentValue, setComponentValue]}
        />
      ))}
    </div>
  );
};

export default TagComponent;
