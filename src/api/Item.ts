import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
const MY_ACCESS_KEY = import.meta.env.VITE_ACCESSKEY;

type getItemProp = {
  itemType: "portfolio" | "project";
  itemId: number;
};
type postItemProp = {
  itemType: string;
  itemId?: string;
  body: any;
};
type tagResDtoList = {
  tagId: number;
  content: string;
  categoryContent: string;
};

interface getPortfolioResponse {
  id: string;
  title: string;
  itemResDtoList: Object[];
  repImgUrl: string;
  tagResDtoList: tagResDtoList[];
}
interface getItemResponse {
  itemId: number;
  itemRecord: string;
  company: string;
  date: string;
  portfolioId: number;
  itemTagList: string[];
  categoryContent: string;
  imageList: string[];
  order: number;
}
type ResponseTypes = {
  portfolio: getPortfolioResponse;
  project: getItemResponse;
};

const getURL = (itemType: string, itemId: string) => {
  switch (itemType) {
    case "portfolio":
      return `${BASE_URL}/v1/portfolio/${itemId}`;
    case "project":
      return `${BASE_URL}/v1/project/${itemId}`;
  }
};

/**
 * props object안에 itemType 과 itemId 를 받아서 requestURL 을 구성한 후 axios 를 통해 get요청을 보내는 함수입니다
 * @itemType 은 "portfolio" 와 같이 /api/v1/ 뒤에 붙어야하는 string형식입니다,
 * @itemId 는 해당 아이템의 id 를 의미합니다. itemId 를 number으로 주는것을 잊지 마세요!
 * @returns {object} axios 를 통해 받은 response 를 반환합니다.
 */

export const getItem = async <T extends keyof ResponseTypes>(
  itemType: T,
  itemId: number
) => {
  const reqURL = getURL(itemType, `${itemId}`);
  if (!reqURL) return;
  const response = await axios.get(reqURL, {
    headers: {
      Authorization: `Bearer ${MY_ACCESS_KEY}`,
    },
  });
  const data = response.data;
  return data as ResponseTypes[T];
};

export const postItem = async (prop: postItemProp) => {
  const { itemType, itemId, body } = prop;
  console.log("body" + body);
  const response = await axios.post(`${BASE_URL}/v1/portfolio/save`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${MY_ACCESS_KEY}`,
    },
    withCredentials: true,
  });
  const data = response;
  console.log("postItem requset funtion :: ", data);
  return data;
};
