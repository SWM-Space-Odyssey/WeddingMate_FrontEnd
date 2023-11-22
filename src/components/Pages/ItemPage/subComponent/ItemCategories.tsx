import React, { useEffect, useState } from "react";
import CustomInput from "../../../Modules/Custom/CustomInput";
import { UseFormRegister, useFormContext } from "react-hook-form";
import CustomText from "../../../Modules/Custom/CustomText";

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
  standAlone?: boolean;
};

const ItemCategories = (props: Props) => {
  const [selectValue, setSelectValue] = useState<string>("default");
  const { register, setValue, getValues } = useFormContext();

  const selectHandler = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const value = e.currentTarget.value;
    setSelectValue(value);
    setValue("itemTagList", []);
    // setValue("categoryContentText", "");
  };

  return (
    <div>
      <div className='mb-1 w-full'>
        <CustomText type='Title' text='카테고리' required={props.required} />
      </div>
      <div className='flex flex-row gap-2 transition-all h-11'>
        {/* <input
          type='text'
          className={`border p-2.5 ${
            selectValue === "직접입력" ? "flex-1" : "hidden"
          }`}
          disabled={selectValue !== "직접입력"}
          {...register("categoryContentText")}
        /> */}
        <select
          className={`border rounded-md text-sm p-2.5 flex-1
          `}
          value={getValues("categoryContent")}
          {...register("categoryContent", {
            onChange: (e) => selectHandler(e),
          })}
        >
          <option value={"default"}>카테고리를 입력해주세요</option>
          {/* 맵핑으로 바꿔야함 */}
          <option value={"드레스"}>드레스</option>
          <option value={"메이크업"}>메이크업</option>
          <option value={"스튜디오"}>스튜디오</option>
          <option value={"웨딩홀"}>웨딩홀</option>
          <option value={"예물"}>예물</option>
          <option value={"부케"}>부케</option>
          <option value={"남성예복"}>남성예복</option>
        </select>
      </div>
      {!props.standAlone && (
        <CustomText type='Description' text='제목에 노출됩니다!' />
      )}
    </div>
  );
};

export default ItemCategories;
