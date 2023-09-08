import { AxiosError } from "axios";
import { SERVER_URL } from "../common/constants";
import store, { RootState } from "../store/store";

export const handleError = (err: AxiosError) => {
  return {
    status: "FAIL" as const,
    data: err,
  };
};

export const getURL = (itemType: string, itemId: string) => {
  switch (itemType) {
    case "portfolio":
      return `${SERVER_URL}/api/v1/portfolio/${itemId}`;
    case "project":
      return `${SERVER_URL}/api/v1/project/${itemId}`;
    case "item":
      return `${SERVER_URL}/api/v1/portfolio/item/${itemId}`;
  }
};

export const dateFormatter = (date: Date) => {
  // const date = new Date(str);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}.${month}.${day}`;
};

export const getAccessToken = () => {
  const reduxToken = store.getState().user.accessToken;
  const accessToken = localStorage.getItem("accessToken");
  const token = accessToken ?? reduxToken;
  if (!token) return false;
  return token;
};
export const getUUID = () => {
  const UUID = localStorage.getItem("UUID");
  if (!UUID) return;
  return UUID;
};
