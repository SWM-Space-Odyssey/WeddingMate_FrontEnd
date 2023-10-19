import axios, { Axios, AxiosError } from "axios";
import { SERVER_URL } from "../common/constants";
import { getAccessToken, getURL, handleError } from "../hooks/apiHook";

type status = "SUCCESS" | "FAIL";
type getLikeResponse = status & {
  data: {
    id: string;
    title: string;
    reqImgUrl: string;
  }[];
};

type poseLikeResponse = status & {
  data: string;
};
type postLikeBody = {
  id: string;
  likeType: "planner"| "item" | "portfolio";
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

export const postLike = async (body: postLikeBody) => {
  const reqURL = `${SERVER_URL}/api/v1/likes`;
  const response = await fetchData<poseLikeResponse>(reqURL, "post", body);
  return response;
};

export const getLike = async (likeType: "company" | "portfolio" | "item") => {
  const reqURL = `${SERVER_URL}/api/v1/likes/by-user-id/${likeType}`;
  const response = await fetchData<getLikeResponse>(reqURL, "get");
  return response;
};
