import axios, { AxiosResponse } from "axios";
// import { MY_ACCESS_KEY, SERVER_URL } from "../common/constants";
import { SERVER_URL } from "../common/constants";
const MY_ACCESS_KEY = localStorage.getItem("accessToken");

type plannerBody = {
  nickname: string;
  company: string;
  position: string;
  region: string;
  plannerTagList: string | undefined;
};

export const plannerRegist = async (body: plannerBody) => {
  console.log(body);
  const response: AxiosResponse = await axios
    .post(`${SERVER_URL}/api/v1/signup/planner`, body, {
      headers: {
        Authorization: `Bearer ${MY_ACCESS_KEY}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
  return response;
};

export const userCheck = async (token: string) => {
  const response: AxiosResponse = await axios
    .get(`${SERVER_URL}/api/v1/category/all`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
    })
    .catch((err) => {
      return err.response;
    });

  return response;
};

export const tokenRefresh = async (accessToken: string) => {
  const response = await axios
    .post(
      `${SERVER_URL}/api/v1/token/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });

  return response;
};
