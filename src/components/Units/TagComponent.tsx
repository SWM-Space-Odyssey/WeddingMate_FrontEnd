import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import TagUnit from "./TagUnit";

interface Props<
  T extends registStateStrings | portfolioStateStrings,
  R extends portfolioFormRegister | registFormRegister
> {
  formElement: T;
  register: UseFormRegister<R>;
  spreadValues: string[];
  tagCountMax?: number;
}

const TagComponent = <
  T extends registStateStrings | portfolioStateStrings,
  R extends portfolioFormRegister | registFormRegister
>(
  props: Props<T, R>
) => {
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
          register={register as any}
          formElement={formElement}
          tagCountMax={tagCountMax}
          tagState={[componentValue, setComponentValue]}
        />
      ))}
    </div>
  );
};

export default TagComponent;
