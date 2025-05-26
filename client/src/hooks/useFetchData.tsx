
import axios from "axios";
import { log } from "console";

export const fetcher = async (url: string) => {
  const token = localStorage.getItem("token");

  console.log(token ,"token");
  

  if (!token) {
    throw new Error("UNAUTHORIZED");
  }

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
