import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import styles from "./DatePicker.module.scss";
import CustomText from "./CustomText";
type Props = {
  state: string;
};

const CustomDatePicker = (props: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={props.state}
      render={({ field }) => (
        <div className={styles.datepicker}>
          <CustomText type='Title' text='날짜' />
          <DatePicker
            {...field}
            onChange={(e) => {
              field.onChange(e);
            }}
            selected={field.value}
            autoComplete='off'
            withPortal
            locale={ko}
            placeholderText='진행된 날짜를 기록해 주세요'
            dateFormat='yyyy년 MM월 dd일'
            className='p-3 h-11 border w-full'
          />
        </div>
      )}
    />

    // <input
    //   type='date'
    //   {...register(props.state)}
    //   className='py-2 h-4'
    //   pattern='\d{4}-\d{2}-\d{2}'
    //   placeholder='진행된 날짜를 기록해 주세요'
    // ></input>
  );
};

export default CustomDatePicker;
