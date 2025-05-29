import axios from "axios";

export const updateData = async (url: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("UNAUTHORIZED");
  }

  const response = await axios.patch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
