import axios, { AxiosError } from "axios";
import { SERVER_URL } from "../common/constants";
import { MY_ACCESS_KEY } from "../common/constants"; // 나중에 Localstorage에서 받아오기
import { handleError } from "../hooks/apiHook";
import { useQuery } from "@tanstack/react-query";
// const MY_ACCESS_KEY = localStorage.getItem("accessToken");
type ItemResponse =
  | {
      status: "SUCCESS";
      data: successDatas;
    }
  | {
      status: "FAIL";
      data: failDatas;
    };
type successDatas = portfolioData;
type failDatas = AxiosError;

type plannerPortfolioObj = {
  title: string;
  repImgUrl: string;
  portfolioId: number;
};
type portfolioData = {
  typeTag: "portfolio";
  data: {
    id: string;
    title: string;
    itemResDtoList: Object[];
    repImgUrl: string;
    tagResDtoList: tagResDtoList[];
  };
};

type tagResDtoList = {
  tagId: number;
  content: string;
  categoryContent: string;
};

type GetPortfolioResponse = portfolioData & {
  status: "SUCCESS" | "FAIL";
};

type GetPlannerPortfolioResponse = {
  status: "SUCCESS" | "FAIL";
  data: plannerPortfolioObj[];
};

export const getOwnPortfolio = async () => {
  // 현재 ACCESS 토큰을 사용해서 작성 Portfolio List 를 받아오는 것 같음
  const response = await axios
    .get(`${SERVER_URL}/api/v1/portfolio/`, {
      headers: { Authorization: `Bearer ${MY_ACCESS_KEY}` },
    })
    .then((res) => {
      return {
        typeTag: "portfolio",
        ...res.data,
      } as GetPlannerPortfolioResponse;
    })
    .catch((err: AxiosError) => {
      return handleError(err);
    });
  return response;
};

export const getPortfolio = async (portfolioId: number) => {
  console.log("getPortfolio" + portfolioId);
  return useQuery(
    ["portfolio"],
    () =>
      axios.get(`${SERVER_URL}/api/v1/portfolio/${portfolioId}`, {
        headers: { Authorization: `Bearer ${MY_ACCESS_KEY}` },
      }),
    {
      enabled: !!portfolioId,
    }
  );
  // console.log(data?.data);
  // if (error) return error;
  // return data?.data as GetPortfolioResponse;

  // 현재 ACCESS 토큰을 사용해서 작성 Portfolio List 를 받아오는 것 같음
  // const response = await axios
  //   .get(`${SERVER_URL}/api/v1/portfolio/${portfolioId}`, {
  //     headers: { Authorization: `Bearer ${MY_ACCESS_KEY}` },
  //   })
  //   .then((res) => {
  //     return {
  //       typeTag: "portfolio",
  //       ...res.data,
  //     } as GetPortfolioResponse;
  //   })
  //   .catch((err: AxiosError) => {
  //     return handleError(err);
  //   });
  // return response;
};

type postItemProp = {
  itemType: string;
  itemId?: number;
  body: FormData;
};
export const postPortfolio = async (prop: postItemProp) => {
  const { itemType, itemId, body } = prop;
  const response = await axios
    .post(`${SERVER_URL}/api/v1/portfolio/save`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${MY_ACCESS_KEY}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      return {
        status: "SUCCESS" as const,
        data: res.data,
      };
    })
    .catch((err: AxiosError) => {
      return handleError(err);
    });

  console.log(response);
  return response;
};

export const putPortfolio = async (prop: postItemProp) => {
  const { itemType, itemId, body } = prop;
  const response = await axios
    .put(`${SERVER_URL}/api/v1/portfolio/${itemId}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${MY_ACCESS_KEY}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      return {
        status: "SUCCESS" as const,
        data: res.data,
      };
    })
    .catch((err: AxiosError) => {
      return handleError(err);
    });

  console.log(response);
  return response;
};

export const deletePortfolio = async (portfolioId: number) => {
  const response = await axios
    .delete(`${SERVER_URL}/api/v1/portfolio/${portfolioId}`, {
      headers: {
        Authorization: `Bearer ${MY_ACCESS_KEY}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return handleError(err) as ItemResponse;
    });
  return response;
};
