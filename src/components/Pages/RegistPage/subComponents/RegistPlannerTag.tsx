import CustomTagBlock from "../../../Modules/CustomTagBlock";
import { PlannerTagList } from "../../../../common/TagList";
import { useDispatch } from "react-redux";
import { NextPage } from "../../../../store/viewSlice";
import { Button } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useEffect, useState } from "react";

type Props = {
  formElement: plannerRegistStates;
};
const RegistPlannerTag = (props: Props) => {
  const dispatch = useDispatch();
  const { control, getValues, setValue } = useFormContext();
  const page = useSelector((state: RootState) => state.view.page);
  const [userType, setUserType] = useState<"couple" | "planner">("couple");
  const formElement = props.formElement;
  const tags = useWatch({
    name: formElement,
  });
  useEffect(() => {
    if (page === 2) {
      setUserType(getValues("type"));
    }
  }, [page]);
  if (userType === "couple") return <></>;
  const tagMax = 3;
  return (
    <div className='px-4 flex flex-col h-full justify-between'>
      <div className='mt-6'>
        <div className='font-bold text-2xl'>
          키워드를 {tagMax}개 선택해 주세요
        </div>

        {/* Grayscale 넣어줘야함!! */}
        <div className='mt-2'>
          선택한 키워드는 프로필에 노출됩니다. 예비 부부의 플래너 선택에 도움을
          줄 수 있어요
        </div>
        <div className='mt-6'>
          <CustomTagBlock
            spreadValues={PlannerTagList}
            formState={formElement}
            maxTag={tagMax}
          />
        </div>
      </div>
      <Button
        className='h-11 w-full'
        variant='contained'
        sx={{ fontSize: "1rem", my: 1 }}
        disabled={tags?.length !== tagMax}
        onClick={() => {
          dispatch(NextPage());
        }}
      >
        <div className='text-white'>
          {tags?.length < 3 ? "태그를 3개 선택해주세요!" : "다음"}
        </div>
      </Button>
    </div>
  );
};

export default RegistPlannerTag;
