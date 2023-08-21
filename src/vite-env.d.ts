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
type stateLiteral =
  | registStates
  | portfolioStates
  | itemStates
  | plannerProfileStates;

interface API_STATUS {
  status: "SUCCESS" | "FAIL";
}

// ========================================================================≈≈
// UserRegist============================================================≈≈
// ========================================================================≈≈
interface registRegister {
  type: string;
  nickname: string;
  company: string;
  position: string;
  region: string[];
  plannerTagList?: string[];
}
type registStates =
  | "type"
  | "nickname"
  | "company"
  | "position"
  | "region"
  | "plannerTagList";

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
  region: string;
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
type ItemBody = {
  itemRecord: string;
  itemTagList: string;
  imageList: string[];
  portfolioId: number;
  category: string;
  date: string;
  company: string;
  order?: number;
  isWriter?: boolean;
};

type itemStates =
  | "categoryContent"
  | "pictures"
  | "itemTagList"
  | "itemRecord"
  | "date"
  | "company";

type cardData = {
  itemRecord: string;
  portfolioId: number;
  itemTagList: string[];
  categoryContent: string;
  imageList: string[];
  order: number;
  itemId: number;
  company: string;
  date: string;
};
// ========================================================================≈≈
// PlannerProfile===============================================================
// ========================================================================≈≈
type plannerProfileStates =
  | "nickname"
  | "company"
  | "position"
  | "region"
  | "tagList"
  | "bio"
  | "sns";

// ========================================================================≈≈
// React Query ===============================================================
// ========================================================================≈≈

interface IntersectionObserverInit {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
}
