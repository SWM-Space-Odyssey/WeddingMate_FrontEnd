/// <reference types="vite/client" />
// interface Window {
//   Kakao: any;
// }

// ========================================================================≈≈
// GLOBAL============================================================≈≈
// ========================================================================≈≈
interface MappingInterface<T, I> {
  [key: string]: {
    state: T;
    title: string;
    placeholder: string;
  };
}
// ========================================================================≈≈
// UserRegist============================================================≈≈
// ========================================================================≈≈
interface registFormRegister {
  Type: string;
  Nickname: string;
  Company: string;
  Grade: string;
  Location: string;
  PlannerTag?: string[];
}
type registStateStrings =
  | "Type"
  | "Nickname"
  | "Company"
  | "Grade"
  | "Location"
  | "PlannerTag";

type registRegisterType = {
  register: UseFormRegister<registFormRegister>;
};

type RegistInputComponentProp = {
  state: registStateStrings;
  title: string;
  placeholder: string;
  register: UseFormRegister<registFormRegister>;
};
// ========================================================================≈≈
// PortFolio===============================================================≈≈
// ========================================================================≈≈

interface portfolioFormRegister {
  Title: string;
  Mood: string[];
  Location: string;
  Picture: File[];
}

type portfolioRegisterType = {
  register: UseFormRegister<portfolioFormRegister>;
};

type portfolioStateStrings = "Title" | "Mood" | "Location" | "Picture";

type RegistInputComponentProp = {
  state: portfolioStateStrings;
  title: string;
  placeholder: string;
  register: UseFormRegister<portfolioFormRegister>;
};
