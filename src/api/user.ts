import axios, { AxiosError, AxiosResponse } from "axios";
// import { MY_ACCESS_KEY, SERVER_URL } from "../common/constants";
import { SERVER_URL } from "../common/constants";
import { getAccessToken, handleError } from "../hooks/apiHook";
const MY_ACCESS_KEY = localStorage.getItem("accessToken");
type nickname = {
  nickname: string;
};

type plannerInfo = {
  company: string;
  position: string;
  regionList: string;
  tagList: string;
};
type plannerProfileInfo = {
  sns: string;
  bio: string;
};
type customerInfo = {
  weddingDate: string;
  weddingDateConfirmed: string;
  regionList: string;
  budget: string;
};
type customerTagList = {
  portfolioTagList: string;
  plannerTagList: string;
  dressTagList: string;
  makeupTagList: string;
  studioTypeTagList: string;
  studioFocusTagList: string;
};

type plannerBody = nickname & {
  company: string;
  position: string;
  regionList: string;
  plannerTagList: string | undefined;
};
type plannerProfileBody = plannerInfo & plannerProfileInfo & nickname;
type IuserProfile = nickname & {
  customerInfo: customerInfo;
  customerTagList: customerTagList;
};
type IformProfile = customerInfo & customerTagList & nickname;

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
        .post<RT>(url, body, axiosOption)
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
      return await axios.delete(url, axiosOption);
    default:
      break;
  }
};

export const plannerRegist = async (body: plannerBody) => {
  const reqURL = `${SERVER_URL}/api/v1/signup/planner`;
  const response = await fetchData(reqURL, "post", body);
  return response;
};

export const coupleRegister = async (body: any) => {
  const reqURL = `${SERVER_URL}/api/v1/signup/customer`;
  const response = await fetchData(reqURL, "post", body);
  return response;
};

export const editProfileImg = async (formData: FormData) => {
  const reqURL = `${SERVER_URL}/api/v1/profile/file`;
  const response = await fetchData(reqURL, "post", formData);
  return response;
};

export const getUserInfo = async (plannerId?: number) => {
  const getURL = (plannerId?: number) => {
    if (plannerId) {
      return `${SERVER_URL}/api/v1/customer/${plannerId}`;
    } else {
      return `${SERVER_URL}/api/v1/profile/customer`;
    }
  };
  const reqURL = getURL(plannerId);
  const response = await fetchData(reqURL, "get");
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

export const editCustomerProfile = async (body: IuserProfile) => {
  const reqURL = `${SERVER_URL}/api/v1/profile/customer`;
  const response = await fetchData<IuserProfile>(reqURL, "put", body);
  return response;
};

export const userCheck = async (token: string) => {
  const response: AxiosResponse = await axios
    .get(`${SERVER_URL}/api/v1/signup/check-registration`, {
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

export const userLogOut = async () => {
  const reqURL = `${SERVER_URL}/api/v1/token/logout`;
  const body = {
    accessToken: getAccessToken(),
  };
  const response = fetchData(reqURL, "post", body);
  return response;
};
export const tokenRefresh = async () => {
  const response: AxiosResponse = await axios
    .post(
      `${SERVER_URL}/api/v1/token/refresh`,
      {},
      {
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

export const userDelete = async () => {
  const reqURL = `${SERVER_URL}/api/v1/user`;
};

export const userReport = async <T>(body: T) => {};
