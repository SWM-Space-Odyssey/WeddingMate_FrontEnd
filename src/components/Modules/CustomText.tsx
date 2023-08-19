import React from "react";

type Props = {
  type:
    | "Title-large"
    | "Title-base"
    | "Title"
    | "Description"
    | "Content"
    | "SubContent"
    | "Content-small";
  text: string;
  required?: boolean;
};

const CustomText = (props: Props) => {
  const type = props.type;
  let textClassName = "";
  switch (type) {
    case "Title-large":
      textClassName = "font-bold text-lg";
      break;
    case "Title-base":
      textClassName = "font-bold text-base";
      break;
    case "Title":
      textClassName = "font-bold text-sm";
      break;
    case "Description":
      textClassName = "text-xs text-gray-400";
      break;
    case "Content":
      textClassName = "text-sm";
      break;
    case "SubContent":
      textClassName = "text-xs text-gray-600";
      break;
    case "Content-small":
      textClassName = "text-xs";
      break;
  }

  return (
    <span className={textClassName}>
      {props.text}
      {props?.required ? <span className='text-[#FF6A6A]'>*</span> : ""}
    </span>
  );
};

export default CustomText;
