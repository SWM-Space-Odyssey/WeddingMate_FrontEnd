import TagComponent from "../../Units/TagComponent";
import { PlannerTagList } from "../../../store/TagList";

type Props = {
  useFormFunctions: useFormFuctnionType;
  formElement: stateStrings;
};
const RegistUserTag = (props: Props) => {
  const register = props.useFormFunctions.register;
  const formElement = props.formElement;
  return (
    <>
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
      {/* <BottomButton text='가입완료' flag={false} /> */}
    </>
  );
};

export default RegistUserTag;
