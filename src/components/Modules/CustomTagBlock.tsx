import React, { useEffect, useState } from "react";
import CustomTag from "./CustomTag";
import { Chip } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";

interface Props<T extends registStates | portfolioStates | itemStates> {
  spreadValues: string[];
  formState?: T;
  initValue?: string[];
  maxTag?: number;
  title?: string;
  renderCounter?: boolean;
  isAddable?: boolean;
}

const CustomTagBlock = <T extends registStates | portfolioStates | itemStates>(
  props: Props<T>
) => {
  const spreadValues = props.spreadValues;
  const state = props.formState;
  const tagCountMax = props.maxTag ? props.maxTag : 1;
  const initValue = props.initValue;
  const [componentValue, setComponentValue] = useState<string[]>([]);
  const [addFormSwitch, setAddFormSwitch] = useState<boolean>(false);
  const [addTag, setAddTag] = useState<string>("");
  const addFormDisplay = () => {
    if (addFormSwitch) return;
    setAddFormSwitch(true);
  };
  if (initValue) {
    useEffect(() => {
      setComponentValue([...initValue]);
    }, [initValue]);
  }
  const onClickAdd = () => {
    if (addTag) {
      spreadValues.push(addTag);
    }
    setAddTag("");
    return setAddFormSwitch(false);
  };

  return (
    <div>
      {props.title && (
        <div>
          <span className='font-bold text-sm'>{props.title}</span>
          {props.renderCounter ? (
            <span>{` ${componentValue.length} / ${tagCountMax}`}</span>
          ) : (
            ""
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
          />
        ))}
        {props.isAddable && (
          <Chip label={`추가`} onClick={() => addFormDisplay()} />
        )}
      </div>
      <div className={`${addFormSwitch ? "block" : "hidden"}`}>
        <input
          type='text'
          className='border'
          value={addTag}
          onChange={(e) => setAddTag(e.currentTarget.value)}
        />
        <button type='button' onClick={() => onClickAdd()}>
          입력
        </button>
      </div>
    </div>
  );
};

export default React.memo(CustomTagBlock);
