import { CountryList } from "../../../store/CountryLIst";

import TagComponent from "../../Units/TagComponent";

type inputComponentContentType = {
  state: stateStrings;
  title: string;
  placeholder: string;
};
interface MappingInterface {
  [key: string]: {
    state: stateStrings;
    title: string;
    placeholder: string;
  };
}

type Props = {
  useFormFunctions: useFormFuctnionType;
};
const RegistUserInfo = (props: Props) => {
  const register = props.useFormFunctions.register;

  const inputComponent = (content: inputComponentContentType) => {
    return (
      <div>
        <div className='font-bold mb-1'>{content.title}</div>
        <input
          className='border rounded-sm w-full py-2.5 px-3'
          placeholder={content.placeholder}
          type='text'
          {...register(content.state)}
        />
      </div>
    );
  };
  const stateMapping: MappingInterface = {
    userNickname: {
      state: "Nickname",
      title: "닉네임",
      placeholder: "사용할 닉네임을 입력해주세요",
    },
    userCompany: {
      state: "Company",
      title: "소속",
      placeholder: "웨딩 플래너님의 소속을 입력해주세요",
    },
    userGrade: {
      state: "Grade",
      title: "직급",
      placeholder: "사원, 대리, 과장 등",
    },
  };
  return (
    <>
      <div className='flex flex-col mt-7 gap-y-7'>
        {inputComponent(stateMapping.userNickname)}
        {inputComponent(stateMapping.userCompany)}
        {inputComponent(stateMapping.userGrade)}
        <div>
          <div className='font-bold mb-1'>지역</div>
          <TagComponent
            spreadValues={CountryList}
            register={register}
            formElement={"PlannerTag"}
          />
        </div>
      </div>
    </>
  );
};

export default RegistUserInfo;
