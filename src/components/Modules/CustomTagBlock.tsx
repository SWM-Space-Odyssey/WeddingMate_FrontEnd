import React, { useEffect, useState } from "react";
import CustomTag from "./CustomTag";
import { Chip, Collapse } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";

interface Props<
  T extends registStates | portfolioStates | itemStates | plannerProfileStates
> {
  spreadValues: string[];
  formState?: T;
  initValue?: string[];
  maxTag?: number;
  title?: string;
  renderCounter?: boolean;
  required?: boolean;
  type?: "item" | "sns";
}

const CustomTagBlock = <
  T extends registStates | portfolioStates | itemStates | plannerProfileStates
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
          <span className='font-bold text-sm'>{props.title}</span>
          {props.renderCounter ? (
            <span>{` ${componentValue.length} / ${tagCountMax}`}</span>
          ) : (
            ""
          )}
          {props.required && <span className='text-[#FF6A6A]'>*</span>}
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
