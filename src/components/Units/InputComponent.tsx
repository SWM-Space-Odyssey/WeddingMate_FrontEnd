import { UseFormRegister, useFormContext } from "react-hook-form";

interface Props<T extends registStateStrings | portfolioStateStrings> {
  content: {
    state: T;
    title: string;
    placeholder: string;
  };
}

const InputComponent = <T extends registStateStrings | portfolioStateStrings>(
  props: Props<T>
) => {
  const { register } = useFormContext();
  return (
    <div>
      <div className='font-bold mb-1'>{props.content.title}</div>
      <input
        className='border rounded-sm w-full py-2.5 px-3'
        placeholder={props.content.placeholder}
        type='text'
        // ㅠㅠ 더이상 시간 할애 불가능 나중에 꼭 고치기
        {...register(props.content.state)}
      />
    </div>
  );
};

export default InputComponent;
