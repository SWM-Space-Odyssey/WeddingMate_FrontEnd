import React from "react";

type Props = {
  type: "Title" | "Description";
  text: string;
};

const CustomText = (props: Props) => {
  const type = props.type;
  let textClassName = "";
  switch (type) {
    case "Title":
      textClassName = "font-bold text-sm";
      break;
    case "Description":
      textClassName = "text-xs text-gray-400";
      break;
  }

  return <span className={textClassName}>{props.text}</span>;
};

export default CustomText;
