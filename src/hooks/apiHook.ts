import { AxiosError } from "axios";
import { SERVER_URL } from "../common/constants";

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
  }
};
