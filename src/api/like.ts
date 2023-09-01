import axios, { Axios, AxiosError } from "axios";
import { SERVER_URL } from "../common/constants";
import { getAccessToken, getURL, handleError } from "../hooks/apiHook";

interface poseLikeResponse {
  status: "SUCCESS" | "FAIL";
  data: string;
}
interface postLikeBody {
  id: string;
  likeType: "PLANNER" | "ITEM" | "PORTFOLIO";
}

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
  const reqURL = `${SERVER_URL}/api/v1/like`;
  const response = await fetchData<poseLikeResponse>(reqURL, "post", body);
  return response;
};
