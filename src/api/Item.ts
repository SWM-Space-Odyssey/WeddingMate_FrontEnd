import axios, { Axios, AxiosError } from "axios";
import { SERVER_URL } from "../common/constants";
// import { getAccessToken } from "../common/constants";
import { getAccessToken, getURL, handleError } from "../hooks/apiHook";

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
  imageListResDtoList: feedContent[];
  nextCursor: number;
  pageSize: number;
};
type feedContent = {
  itemId: number | null;
  fileId: number | null;
  url: string;
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

const fetchData = async <RT>(
  url: string,
  method: "get" | "post" | "put" | "delete",
  body?: any
) => {
  const axiosOption = {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
    withCredentials: true,
  };
  switch (method) {
    case "get":
      return await axios
        .get<RT>(url, axiosOption)
        .then((res) => {
          return res.data;
        })
        .catch((err: AxiosError) => {
          return handleError(err);
        });
    case "post":
      return await axios.post(url, body, axiosOption);
    case "put":
      return await axios.put(url, body, axiosOption);
    case "delete":
      return await axios.delete(url, axiosOption);
    default:
      break;
  }
};

export const fetchItems = async (itemId: number) => {
  const reqURL = getURL("item", `${itemId}`);
  if (!reqURL) return;
  const response = await fetchData<ItemResponse>(reqURL, "get");
  if (response?.data.status === "SUCCESS") {
    response.data.data.typeTag = "item";
  }
  return response;
};

export const getTagList = async (category: string) => {
  const reqURL = `${SERVER_URL}/api/v1/tag/all?category=${category}`;
  const response = await fetchData(reqURL, "get");

  return response;
};

export const getFeedImage = async (pageParam: number) => {
  const accessToken = getAccessToken();
  if (!accessToken) return { status: "FAIL" as const, data: null };
  const response = await axios
    .get<ItemResponse>(`${SERVER_URL}/api/v1/file`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { cursor: pageParam },
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
        Authorization: `Bearer ${getAccessToken()}`,
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
  return response;
};

export const postItem = async (body: ItemBody) => {
  const response = await axios
    .post(`${SERVER_URL}/api/v1/portfolio/item/save`, body, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
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
        Authorization: `Bearer ${getAccessToken()}`,
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
        Authorization: `Bearer ${getAccessToken()}`,
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
