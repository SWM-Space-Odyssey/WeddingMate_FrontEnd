import axios, { AxiosError } from "axios";
import { SERVER_URL } from "../common/constants";
import { MY_ACCESS_KEY } from "../common/constants"; // 나중에 Localstorage에서 받아오기
import { handleError } from "../hooks/apiHook";
// const MY_ACCESS_KEY = localStorage.getItem("accessToken");

interface plannerPortfolioObj {
  title: string;
  repImgUrl: string;
  portfolioId: number;
}
interface GET_API_RESPONSE extends API_STATUS {
  data: plannerPortfolioObj[] | object;
}

export const getOwnPortfolio = async () => {
  // 현재 ACCESS 토큰을 사용해서 작성 Portfolio List 를 받아오는 것 같음
  const response = await axios
    .get(`${SERVER_URL}/api/v1/portfolio/`, {
      headers: { Authorization: `Bearer ${MY_ACCESS_KEY}` },
    })
    .then((res) => {
      return res;
    })
    .catch((err: AxiosError) => {
      return handleError(err);
    });
  return response as GET_API_RESPONSE;
};

type postItemProp = {
  itemType: string;
  itemId?: string;
  body: any;
};
export const postPortfolio = async (prop: postItemProp) => {
  const { itemType, itemId, body } = prop;
  console.log(body, MY_ACCESS_KEY);
  const response = await axios
    .post(`${SERVER_URL}/api/v1/portfolio/save`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${MY_ACCESS_KEY}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      return res;
    })
    .catch((err: AxiosError) => {
      return handleError(err);
    });

  return response as GET_API_RESPONSE;
};
