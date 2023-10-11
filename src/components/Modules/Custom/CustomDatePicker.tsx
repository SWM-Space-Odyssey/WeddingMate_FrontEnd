import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import "./DatePicker.scss";

import CustomText from "./CustomText";
type Props = {
  state: string;
  required?: boolean;
  placeholder?: string;
  init?: string;
};

const CustomDatePicker = (props: Props) => {
  const { control } = useFormContext();
  const [dateFlag, setDateFlag] = useState(false);
  const placeholder = props.placeholder;
  const initValue = () => {
    if (props.init && !dateFlag) {
      setDateFlag(true);
      console.log(new Date(props.init));
      return new Date(props.init);
    } else {
      return null;
    }
  };
  return (
    <Controller
      control={control}
      name={props.state}
      render={({ field }) => {
        return (
          <div>
            <CustomText type='Title' text='날짜' required={props.required} />
            <DatePicker
              {...field}
              onChange={(e) => {
                field.onChange(e);
                console.log(e);
              }}
              selected={props.init ? initValue() : field.value}
              autoComplete='off'
              withPortal
              locale={ko}
              placeholderText={
                placeholder ? placeholder : "진행된 날짜를 기록해 주세요"
              }
              maxDate={placeholder ? null : new Date()}
              minDate={placeholder ? new Date() : null}
              dateFormat='yyyy년 MM월 dd일'
              className='p-3 h-11 border w-full'
            />
          </div>
        );
      }}
    />
  );
};

export default CustomDatePicker;
