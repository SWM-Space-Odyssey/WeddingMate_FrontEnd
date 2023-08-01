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
type stateLiteral = registStates | portfolioStates | itemStates;
// ========================================================================≈≈
// UserRegist============================================================≈≈
// ========================================================================≈≈
interface registRegister {
  Type: string;
  Nickname: string;
  Company: string;
  Grade: string;
  Location: string[];
  PlannerTag?: string[];
}
type registStates =
  | "Type"
  | "Nickname"
  | "Company"
  | "Grade"
  | "Location"
  | "PlannerTag";

type registRegisterType = {
  register: UseFormRegister<registRegister>;
};

type RegistInputProp = {
  state: registStates;
  title: string;
  placeholder: string;
  register: UseFormRegister<registRegister>;
};
// ========================================================================≈≈
// PortFolio===============================================================≈≈
// ========================================================================≈≈

interface portfolioRegister {
  Title: string;
  Mood: string[];
  Location: string[];
  pictures: File[] | string[];
}

type portfolioRegisterType = {
  register: UseFormRegister<portfolioRegister>;
};

type portfolioStates = "Title" | "Mood" | "Location" | "pictures";

type RegistInputProp = {
  state: portfolioStates;
  title: string;
  placeholder: string;
  register: UseFormRegister<portfolioRegister>;
};

// ========================================================================≈≈
// Item ===============================================================≈≈
// ========================================================================≈≈
interface itemRegister {
  categoryContent: string;
  pictures: File[];
  itemTagList: string[];
  itemRecord: string;
  date?: string;
  company?: string;
}
type itemRegisterType = {
  register: UseFormRegister<itemRegister>;
};

type itemStates =
  | "categoryContent"
  | "pictures"
  | "itemTagList"
  | "itemRecord"
  | "date"
  | "company";
