/// <reference types="vite/client" />
// interface Window {
//   Kakao: any;
// }

type ReactStringStateType = [
  string,
  (
    | React.Dispatch<React.SetStateAction<string>>
    | ((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void)
  )
];
type ReactRefType = React.RefObject<HTMLInputElement>;

type userInfoState = {
  Nickname: ReactStringStateType;
  Company: ReactStringStateType;
  Grade: ReactStringStateType;
  Location: ReactStringStateType;
};
type userInfoRef = {
  Nickname: ReactRefType;
  Company: ReactRefType;
  Grade: ReactRefType;
  Location: [string, React.Dispatch<React.SetStateAction<string>>];
};

interface FormInput {
  Type: string;
  Nickname: string;
  Company: string;
  Grade: string;
  Location: string;
  PlannerTag?: string[];
}
type stateStrings =
  | "Type"
  | "Nickname"
  | "Company"
  | "Grade"
  | "Location"
  | "PlannerTag";

type useFormFuctnionType = {
  register: UseFormRegister<FormInput>;
};
