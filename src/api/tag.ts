import axios from "axios";
import { SERVER_URL } from "../common/constants";

export const getTagsByCategory = async (category: string) => {
  const response = await axios
    .get(`${SERVER_URL}/api/v1/tag/category/${category}`)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  return response;
};
