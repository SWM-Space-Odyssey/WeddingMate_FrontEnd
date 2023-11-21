import axios, { AxiosError } from "axios";
import { getAccessToken, handleError } from "../hooks/apiHook";
import { SERVER_URL } from "../common/constants";

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
      return await axios
        .post(url, body, axiosOption)
        .then((res) => {
          return res.data;
        })
        .catch((err: AxiosError) => {
          return handleError(err);
        });
    case "put":
      return await axios.put(url, body, axiosOption);
    case "delete":
      return await axios.delete(url, axiosOption);
    default:
      break;
  }
};

export type CommunityParams = {
  page: number;
};

export const getCommunityList = async (page?: number) => {
  const REQ_URL = `${SERVER_URL}/api/v1/community/post/list`;
  const pageOption = `?size=10&page=${page ? page - 1 : 0}`;
  const response = await fetchData(REQ_URL + pageOption, "get");
  return response;
};

export const getCommunityPost = async (postId: number) => {
  const REQ_URL = `${SERVER_URL}/api/v1/community/post/${postId}`;
  const response = await fetchData(REQ_URL, "get");
  return response;
};
