import { useState } from "react";
import { UseFormRegister, useFormContext } from "react-hook-form";
import TagUnit from "./TagUnit";

interface Props<T extends registStateStrings | portfolioStateStrings> {
  formElement: T;
  spreadValues: string[];
  tagCountMax?: number;
  title?: string;
  TagCount?: boolean;
}

const TagComponent = <T extends registStateStrings | portfolioStateStrings>(
  props: Props<T>
) => {
  const spreadValues = props.spreadValues;
  const formElement = props.formElement;
  const tagCountMax = props.tagCountMax ? props.tagCountMax : 1;
  const [componentValue, setComponentValue] = useState<string[]>([]);
  return (
    <>
      {props.title && (
        <div>
          {props.title}
          {props.TagCount ? (
            <span>{` ${componentValue.length} / ${tagCountMax}`}</span>
          ) : (
            ""
          )}
        </div>
      )}
      <div className='flex flex-wrap gap-1.5'>
        {spreadValues.map((item, index) => (
          <TagUnit
            key={index}
            text={item}
            formElement={formElement}
            tagCountMax={tagCountMax}
            tagState={[componentValue, setComponentValue]}
          />
        ))}
      </div>
    </>
  );
};

export default TagComponent;
