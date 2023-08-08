import axios, { AxiosResponse } from "axios";
import { SERVER_URL } from "../common/constants";

export const userCheck = async (token: string) => {
  const response: AxiosResponse = await axios
    .get(`${SERVER_URL}/api/v1/category/all`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      return res;
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
