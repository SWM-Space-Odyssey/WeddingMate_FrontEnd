import React, { useEffect, useState } from "react";
import CustomTag from "./CustomTag";
import CustomText from "./CustomText";

interface Props<
  T extends
    | plannerRegistStates
    | portfolioStates
    | itemStates
    | plannerProfileStates
    | coupleRegistStates
> {
  spreadValues: string[];
  formState?: T;
  initValue?: string[];
  maxTag?: number;
  title?: string;
  subtitle?: string;
  renderCounter?: boolean;
  required?: boolean;
  type?: "item" | "sns";
}

const CustomTagBlock = <
  T extends
    | plannerRegistStates
    | portfolioStates
    | itemStates
    | plannerProfileStates
    | coupleRegistStates
>(
  props: Props<T>
) => {
  const spreadValues = props.spreadValues;
  const state = props.formState;
  const tagCountMax = props.maxTag ? props.maxTag : 1;
  const initValue = props.initValue;
  const [componentValue, setComponentValue] = useState<string[]>([]);

  useEffect(() => {
    if (!initValue || !initValue[0]) return;
    setComponentValue([...initValue]);
  }, [initValue]);

  return (
    <div>
      {props.title && (
        <div className='pb-1'>
          <div>
            <span className='font-bold text-sm'>{props.title}</span>
            {props.renderCounter ? (
              <CustomText
                type='SubContent'
                text={` ${componentValue.length} / ${tagCountMax}`}
              />
            ) : (
              ""
            )}
            {props.required && <span className='text-[#FF6A6A]'>*</span>}
          </div>
          {props.subtitle && (
            <div>
              <CustomText type='Description' text={props.subtitle} />
            </div>
          )}
        </div>
      )}
      <div className='flex flex-wrap gap-1.5'>
        {spreadValues.map((item, index) => (
          <CustomTag
            key={index}
            text={`${state ? "" : "#"}${item}`}
            formState={
              state && {
                state: state,
                tagState: [componentValue, setComponentValue],
              }
            }
            tagCountMax={tagCountMax}
            type={props.type}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(CustomTagBlock);
