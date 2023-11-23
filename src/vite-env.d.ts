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
  | plannerRegistStates
  | portfolioStates
  | itemStates
  | plannerProfileStates
  | contactFormState
  | communityFormState;

interface API_STATUS {
  status: "SUCCESS" | "FAIL";
}
type PageList =
  | "Regist"
  | "LandingPage"
  | "PortfolioCreate"
  | "Portfolio"
  | "Item"
  | "ItemCreate"
  | "Planner"
  | "Feed"
  | "Search"
  | "Community"
  | "Like"
  | "PlannerMypage";
// ========================================================================≈≈
// UserRegist============================================================≈≈
// ========================================================================≈≈
interface plannerRegister {
  type: "planner";
  nickname: string;
  company: string;
  position: string;
  regionList: string[];
  plannerTagList?: string[];
}

interface coupleRegister {
  type: "couple";
  nickname: string;
  region: string[];
  regionList: string;
  weddingDate: string;
  weddingDateConfirmed: boolean;
  budget: string[];
  portfolioTagList: string[];
  plannerTagList: string[];
  dressTagList: string[];
  studioTypeTagList: string[];
  makeupTagList: string[];
  studioFocusTagList: string[];
}
type plannerRegistStates =
  | "type"
  | "nickname"
  | "company"
  | "position"
  | "regionList"
  | "plannerTagList";
type coupleRegistStates =
  | "type"
  | "nickname"
  | "region"
  | "weddingDate"
  | "weddingDateConfirmed"
  | "budget"
  | "customerTagList"
  | "portfolioTagList"
  | "plannerTagList"
  | "dressTagList"
  | "makeupTagList"
  | "studioTypeTagList"
  | "studioFocusTagList";

type registRegisterType = {
  register: UseFormRegister<plannerRegister>;
};

type RegistInputProp<T extends plannerRegistStates | coupleRegistStates> = {
  state: T;
  title: string;
  placeholder: string;
  register: UseFormRegister<T>;
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
  date?: string;
  companyName?: string;
  companyId?: number;
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
  itemTagList: string;
  category: string;
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
type contactFormState = "message" | "contact";
type communityFormState = "title" | "content" | "category";
// ========================================================================≈≈
// React Query ===============================================================
// ========================================================================≈≈

interface IntersectionObserverInit {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
}
