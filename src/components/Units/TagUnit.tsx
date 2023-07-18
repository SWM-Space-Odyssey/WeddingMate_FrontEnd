import React from "react";

type Props = {
  text: string;
  flag: boolean;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

// selected logic, text, state function
const TagUnit = (props: Props) => {
  const setUnitValue = props.setState;
  const text = props.text;
  const selected = "border-2 font-bold";
  return (
    <button
      onClick={() => {
        setUnitValue(text);
      }}
      className={`text-sm w-fit border ml-1.5 mb-1.5 px-3 py-2.5 rounded-[40px] ${
        props.flag ? selected : ""
      }`}
    >
      {text}
    </button>
  );
};

export default React.memo(TagUnit);
