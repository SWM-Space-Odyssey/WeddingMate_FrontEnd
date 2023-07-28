import React from "react";

type Props = {
  type: "Title" | "Description" | "Title-large" | "Content";
  text: string;
};

const CustomText = (props: Props) => {
  const type = props.type;
  let textClassName = "";
  switch (type) {
    case "Title-large":
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
  }

  return <span className={textClassName}>{props.text}</span>;
};

export default CustomText;
