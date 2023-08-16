import CustomTagBlock from "../../../Modules/CustomTagBlock";
import { PlannerTagList } from "../../../../common/TagList";
import { useDispatch } from "react-redux";
import { NextPage } from "../../../../store/viewSlice";
import { Button } from "@mui/material";
import { useWatch } from "react-hook-form";

type Props = {
  formElement: registStates;
};
const RegistUserTag = (props: Props) => {
  const dispatch = useDispatch();
  const formElement = props.formElement;
  const tags = useWatch({
    name: formElement,
  });
  return (
    <div className='px-4 flex flex-col h-full justify-between'>
      <div className='mt-20'>
        <div className='font-bold text-2xl'>키워드를 2개 선택해 주세요</div>

        {/* Grayscale 넣어줘야함!! */}
        <div className='mt-2'>
          선택한 키워드는 프로필에 노출됩니다. 예비 부부의 플래너 선택에 도움을
          줄 수 있어요
        </div>
        <div className='mt-10'>
          <CustomTagBlock
            spreadValues={PlannerTagList}
            formState={formElement}
            maxTag={2}
          />
        </div>
      </div>
      <Button
        className='h-11 w-full'
        variant='contained'
        sx={{ fontSize: "1rem", my: 1 }}
        disabled={tags?.length !== 2}
        onClick={() => {
          dispatch(NextPage());
        }}
      >
        <div className='text-white'>다음</div>
      </Button>
    </div>
  );
};

export default RegistUserTag;
