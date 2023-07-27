import React, { useState } from "react";
import CustomInput from "../../../Modules/CustumInput";
import { UseFormRegister, useFormContext } from "react-hook-form";
import CustomText from "../../../Modules/CustomText";

interface itemFormRegister {
  Title: string;
  Picture: File[];
  Tags: string[];
  Comment: string;
  Date: string;
  Company: string;
}
type itemRegisterType = {
  register: UseFormRegister<itemFormRegister>;
};

type Props = {};

const ItemCategories = (props: Props) => {
  const [selectValue, setSelectValue] = useState<string>("드레스");
  const { register } = useFormContext();

  const selectHandler = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    console.log(e);
    const value = e.currentTarget.value;
    setSelectValue(value);
    register("categoryContent", { value: value });
  };
  return (
    <div>
      <div className='mb-1'>
        <CustomText type='Title' text='카테고리' />
      </div>
      <div className='flex flex-row gap-2 transition-all'>
        <input
          type='text'
          className={`border ${selectValue === "beta" ? "flex-1" : "hidden"}`}
          disabled={selectValue !== "beta"}
          value={selectValue}
          onChange={(e) => selectHandler(e)}
        />
        <select
          className={`border rounded-md text-sm ${
            selectValue === "alpha" ? "flex-1" : "flex-2"
          }`}
          onChange={(e) => selectHandler(e)}
        >
          <option value={"드레스"}>드레스</option>
          <option value={"메이크업"}>메이크업</option>
          <option value={"스튜디오"}>스튜디오</option>
          <option value={"직접 입력"}>직접 입력</option>
        </select>
      </div>
      <CustomText type='Description' text='제목에 노출됩니다!' />
    </div>
  );
};

export default ItemCategories;
