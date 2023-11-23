import axios, { AxiosError } from "axios";
import { getAccessToken, handleError } from "../hooks/apiHook";
import { SERVER_URL } from "../common/constants";

export const fetchData = async <RT>(
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
      return await axios
        .put(url, body, axiosOption)
        .then((res) => {
          return res.data;
        })
        .catch((err: AxiosError) => {
          return handleError(err);
        });

    case "delete":
      return await axios
        .delete(url, axiosOption)
        .then((res) => {
          return res.data;
        })
        .catch((err: AxiosError) => {
          return handleError(err);
        });
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

export const postComment = async (postId: number, content: string) => {
  const REQ_URL = `${SERVER_URL}/api/v1/community/post/${postId}/comment`;
  const response = await fetchData(REQ_URL, "post", { content });
  return response;
};

type ContentBody = {
  title: string;
  content: string;
  category: string;
};
export const postContent = async (body: ContentBody) => {
  const REQ_URL = `${SERVER_URL}/api/v1/community/post/save`;
  const response = await fetchData(REQ_URL, "post", body);
  return response;
};

export const putContent = async (postId: number, body: ContentBody) => {
  const REQ_URL = `${SERVER_URL}/api/v1/community/post/${postId}`;
  const response = await fetchData(REQ_URL, "put", body);
  return response;
};

export const deleteComment = async (commentId: number) => {
  const REQ_URL = `${SERVER_URL}/api/v1/community/post/comment/${commentId}`;
  const response = await fetchData(REQ_URL, "delete");
  return response;
};

export const deleteContent = async (contentId: number) => {
  const REQ_URL = `${SERVER_URL}/api/v1/community/post/${contentId}`;
  const response = await fetchData(REQ_URL, "delete");
  return response;
};
