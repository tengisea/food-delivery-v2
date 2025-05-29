import axios from "axios";

export const postData = async (url: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("UNAUTHORIZED");
  }

  const response = await axios.post(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
