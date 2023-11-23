import { SERVER_URL } from "../common/constants";
import { fetchData } from "./user";

export const getCompanyDetail = async (id: number) => {
  const REQ_URL = `${SERVER_URL}/api/v1/company/${id}`;
  const response = await fetchData(REQ_URL, "get");
  return response;
};
