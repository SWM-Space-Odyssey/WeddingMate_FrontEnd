import React, { useEffect, useState } from "react";
import CustomInput from "../../../Modules/CustomInput";
import { UseFormRegister, useFormContext } from "react-hook-form";
import CustomText from "../../../Modules/CustomText";

interface itemFormRegister {
  Title: string;
  pictures: string[];
  Tags: string[];
  Comment: string;
  Date: string;
  Company: string;
}
type itemRegisterType = {
  register: UseFormRegister<itemFormRegister>;
};

type Props = {
  required?: boolean;
};

const ItemCategories = (props: Props) => {
  const [selectValue, setSelectValue] = useState<string>("드레스");
  const { register, setValue } = useFormContext();

  const selectHandler = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;
    console.log(e.currentTarget.value);
    if (selectValue !== "직접입력" || e.currentTarget.type === "select-one") {
      setSelectValue(value);
    }
    setValue("categoryContentText", "");
  };
  useEffect(() => {
    console.log(selectValue);
    if (selectValue === "직접입력") {
      setValue("categoryContent", "");
    } else {
      setValue("categoryContent", selectValue);
    }
  }, [selectValue]);

  return (
    <div>
      <div className='mb-1 w-full'>
        <CustomText type='Title' text='카테고리' required={props.required} />
      </div>
      <div className='flex flex-row gap-2 transition-all h-11'>
        <input
          type='text'
          className={`border p-2.5 ${
            selectValue === "직접입력" ? "flex-1" : "hidden"
          }`}
          disabled={selectValue !== "직접입력"}
          {...register("categoryContentText")}
        />
        <select
          className={`border rounded-md text-sm p-2.5 ${
            selectValue === "직접입력" ? "flex-2" : "flex-1"
          }`}
          {...register("categoryContent", {
            onChange: (e) => selectHandler(e),
          })}
        >
          <option value={"default"}>카테고리를 입력해주세요</option>
          <option value={"드레스"}>드레스</option>
          <option value={"메이크업"}>메이크업</option>
          <option value={"스튜디오"}>스튜디오</option>
          <option value={"직접입력"}>직접 입력</option>
        </select>
      </div>
      <CustomText type='Description' text='제목에 노출됩니다!' />
    </div>
  );
};

export default ItemCategories;
