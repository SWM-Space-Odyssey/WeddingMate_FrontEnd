import { AxiosError } from "axios";
import { SERVER_URL } from "../common/constants";
import store, { RootState } from "../store/store";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../store/userSlice";

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
  if (reduxToken === null && accessToken !== null) {
    setReduxAccessToken(accessToken);
  }
  return token;
};

export const useUUID = () => {
  const UUID = localStorage.getItem("UUID");
  if (!UUID) {
    const newUUID = uuidv4();
    localStorage.setItem("uuid", newUUID);
    return newUUID;
  }
  return UUID;
};

const setReduxAccessToken = (token: string) => {
  const dispatch = useDispatch();
  dispatch(setAccessToken(token));
};
