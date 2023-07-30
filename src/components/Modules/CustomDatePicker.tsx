import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  state: string;
};

const CustomDatePicker = (props: Props) => {
  const { register, control } = useFormContext();

  return (
    // <div>CustomDatePicker</div>
    <input type='date' {...register(props.state)} />
  );
};

export default CustomDatePicker;
