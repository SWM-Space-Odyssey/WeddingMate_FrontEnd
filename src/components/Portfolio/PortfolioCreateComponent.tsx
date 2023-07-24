import React, { useEffect } from "react";
import InputComponent from "../Units/InputComponent";
import { UseFormRegister, useForm } from "react-hook-form";
import TagComponent from "../Units/TagComponent";
import { MoodTagList } from "../../store/TagList";
import { CountryList } from "../../store/CountryLIst";

type Props = {};
interface PortfolioInputContentType {
  state: "Title";
  title: string;
  placeholder: string;
  register: UseFormRegister<portfolioFormRegister>;
}

const PortfolioCreateComponent = (props: Props) => {
  const { register, watch, handleSubmit } = useForm<portfolioFormRegister>();

  const InputContent: PortfolioInputContentType = {
    state: "Title",
    title: "타이틀",
    placeholder: "제목을 입력해 주세요",
    register: register,
  };
  const Mood = watch("Mood");
  useEffect(() => {
    console.log("MOOD :", Mood);
  }, [Mood]);

  return (
    <div>
      <form>
        <InputComponent content={InputContent} />
        <div>Mood</div>
        <TagComponent
          spreadValues={MoodTagList}
          register={register}
          formElement='Mood'
          tagCountMax={3}
        />
        <div>Location</div>
        <div>{Mood?.length ? Mood.length : 0}/3</div>
        <TagComponent
          spreadValues={CountryList}
          register={register}
          formElement='Location'
        />
      </form>
    </div>
  );
};

export default PortfolioCreateComponent;
