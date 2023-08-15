import axios, { Axios, AxiosError } from "axios";
import { SERVER_URL } from "../common/constants";
// import { MY_ACCESS_KEY } from "../common/constants";
import { getURL, handleError } from "../hooks/apiHook";
const MY_ACCESS_KEY = localStorage.getItem("accessToken");

type ItemResponse =
  | {
      status: "SUCCESS";
      data: successDatas;
    }
  | {
      status: "FAIL";
      data: failDatas;
    };
type successDatas = itemTagData | portfolioData | feedData | URI | ItemData;
type failDatas = AxiosError;

type URI = {
  typeTag: "URI";
  data: string;
};

type itemTagData = {
  typeTag: "itemTag";
  tagList: string[];
};

export type feedData = {
  typeTag: "feed";
  content: feedContent[];
  pageable: pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};
type feedContent = {
  itemId: number | null;
  portfolioId: number | null;
  url: string;
};
type pageable = {
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
};

type portfolioData = {
  typeTag: "portfolio";
  id: string;
  title: string;
  itemResDtoList: Object[];
  repImgUrl: string;
  tagResDtoList: tagResDtoList[];
};
type tagResDtoList = {
  tagId: number;
  content: string;
  categoryContent: string;
};

type ItemData = ItemBody & {
  typeTag: "item";
};

/**
 * props object안에 itemType 과 itemId 를 받아서 requestURL 을 구성한 후 axios 를 통해 get요청을 보내는 함수입니다
 * @itemType 은 "portfolio" 와 같이 /api/v1/ 뒤에 붙어야하는 string형식입니다,
 * @itemId 는 해당 아이템의 id 를 의미합니다. itemId 를 number으로 주는것을 잊지 마세요!
 * @returns {object} axios 를 통해 받은 response 를 반환합니다.
 */
export const getItem = async (
  itemType: "portfolio" | "item",
  itemId: number
) => {
  const reqURL = getURL(itemType, `${itemId}`);
  if (!reqURL) return;
  const response = await axios
    .get<ItemResponse>(reqURL, {
      headers: {
        Authorization: `Bearer ${MY_ACCESS_KEY}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      if (res.data.status === "SUCCESS") {
        res.data.data.typeTag = itemType;
      }
      return res.data;
    })
    .catch((err: AxiosError) => {
      return handleError(err) as ItemResponse;
    });

  return response;
};

export const getTagList = async (category: string) => {
  const response = await axios
    .get<ItemResponse>(`${SERVER_URL}/api/v1/tag/all?category=${category}`, {
      headers: {
        Authorization: `Bearer ${MY_ACCESS_KEY}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err: AxiosError) => {
      return handleError(err) as ItemResponse;
    });
  return response;
};

export const getFeedImage = async (pageParam: number, size: number) => {
  const response = await axios
    .get<ItemResponse>(`${SERVER_URL}/api/v1/file`, {
      headers: {
        Authorization: `Bearer ${MY_ACCESS_KEY}`,
      },
      params: { page: pageParam, size: size },
      withCredentials: true,
    })
    .then((res) => {
      // return res.data;
      const successData = res.data as { status: "SUCCESS"; data: feedData };
      successData.data.typeTag = "feed";
      return successData;
    })
    .catch((err) => {
      // throw new Error(err);
      return handleError(err) as ItemResponse;
    });
  return response;
};

export const postImageAndGetURI = (formData: FormData) => {
  const response = axios
    .post(`${SERVER_URL}/api/v1/portfolio/item/file`, formData, {
      headers: {
        Authorization: `Bearer ${MY_ACCESS_KEY}`,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    })
    .then((res) => {
      const data = {
        status: "SUCCESS" as const,
        data: res.data.data,
      };
      return data;
    });
  console.log(response);
  return response;
};

export const postItem = async (body: ItemBody) => {
  const response = await axios
    .post(`${SERVER_URL}/api/v1/portfolio/item/save`, body, {
      headers: {
        Authorization: `Bearer ${MY_ACCESS_KEY}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      const data = {
        status: "SUCCESS" as const,
        data: res.data.data,
      };
      return data;
    })
    .catch((err) => {
      return handleError(err) as ItemResponse;
    });
  return response;
};

export const putItem = async (itemId: number, body: ItemBody) => {
  const response = await axios
    .put(`${SERVER_URL}/api/v1/portfolio/item/${itemId}`, body, {
      headers: {
        Authorization: `Bearer ${MY_ACCESS_KEY}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      const data = {
        status: "SUCCESS" as const,
        data: res.data.data,
      };
      return data;
    })
    .catch((err) => {
      return handleError(err) as ItemResponse;
    });
  return response;
};

export const deleteItem = async (itemId: number) => {
  const response = await axios
    .delete(`${SERVER_URL}/api/v1/portfolio/item/${itemId}`, {
      headers: {
        Authorization: `Bearer ${MY_ACCESS_KEY}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      const data = {
        status: "SUCCESS" as const,
        data: res.data.data,
      };
      return data;
    })
    .catch((err) => {
      return handleError(err) as ItemResponse;
    });
  return response;
};
