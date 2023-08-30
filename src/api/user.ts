import axios, { AxiosResponse } from "axios";
// import { MY_ACCESS_KEY, SERVER_URL } from "../common/constants";
import { SERVER_URL } from "../common/constants";
import { getAccessToken } from "../hooks/apiHook";
const MY_ACCESS_KEY = localStorage.getItem("accessToken");

type plannerBody = {
  nickname: string;
  company: string;
  position: string;
  region: string;
  plannerTagList: string | undefined;
};
type plannerProfileBody = {
  nickname: string;
  plannerInfo: {
    company: string;
    position: string;
    region: string;
    tagList: string;
  };
  plannerProfileInfo: {
    sns: string;
    bio: string;
  };
};

export const plannerRegist = async (body: plannerBody) => {
  const response: AxiosResponse = await axios
    .post(`${SERVER_URL}/api/v1/signup/planner`, body, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
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
export const editProfileImg = async (formData: FormData) => {
  const response: AxiosResponse = await axios
    .post(`${SERVER_URL}/api/v1/profile/file`, formData, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
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

type userCheckResponse = {
  status: number;
  data: {
    status: "SUCCESS" | "FAIL";
    data: "UNREGISTERED" | "PLANNER" | "CUSTOMER";
  };
};
export const editPlannerProfile = async (body: plannerProfileBody) => {
  const response: AxiosResponse = await axios
    .put(`${SERVER_URL}/api/v1/profile/planner`, body, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
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
    .get(`${SERVER_URL}/api/v1/signup`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    })
    .then((res) => {
      return res as userCheckResponse;
    })
    .catch((err) => {
      return err.response;
    });

  return response;
};

export const tokenRefresh = async (accessToken: string) => {
  const storageToken = getAccessToken();
  const token: string = accessToken ?? storageToken;

  const response: AxiosResponse = await axios
    .post(
      `${SERVER_URL}/api/v1/token/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
