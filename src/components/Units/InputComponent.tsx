import { UseFormRegister } from "react-hook-form";

type Props = {
  content: {
    state: stateStrings;
    title: string;
    placeholder: string;
  };
  register: UseFormRegister<FormInput>;
};

const InputComponent = (props: Props) => {
  return (
    <div>
      <div className='font-bold mb-1'>{props.content.title}</div>
      <input
        className='border rounded-sm w-full py-2.5 px-3'
        placeholder={props.content.placeholder}
        type='text'
        {...props.register(props.content.state)}
      />
    </div>
  );
};

export default InputComponent;
