import TagComponent from "../../Units/TagComponent";
import { PlannerTagList } from "../../../store/TagList";
import { useDispatch } from "react-redux";
import { NextPage } from "../../../store/dataSlice";
import { Button } from "@mui/material";

type Props = {
  useFormFunctions: registRegisterType;
  formElement: registStateStrings;
};
const RegistUserTag = (props: Props) => {
  const dispatch = useDispatch();
  const register = props.useFormFunctions.register;
  const formElement = props.formElement;
  return (
    <div className='px-4 flex flex-col h-full justify-between'>
      <div className='mt-10'>
        <div className='font-bold text-2xl'>키워드를 2개 선택해 주세요</div>

        {/* Grayscale 넣어줘야함!! */}
        <div className='mt-2'>
          선택한 키워드는 프로필에 노출됩니다. 예비 부부의 플래너 선택에 도움을
          줄 수 있어요
        </div>
        <div className='mt-10'>
          <TagComponent
            spreadValues={PlannerTagList}
            register={register}
            formElement={formElement}
            tagCountMax={2}
          />
        </div>
      </div>
      <Button
        className='h-11 w-full'
        variant='outlined'
        sx={{ fontSize: "1rem", my: 1 }}
        onClick={() => {
          dispatch(NextPage());
        }}
      >
        다음
      </Button>
    </div>
  );
};

export default RegistUserTag;
