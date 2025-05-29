import axios from "axios";

export const createCategory = async (categoryName: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("UNAUTHORIZED");
  }

  const response = await axios.post(
    `${process.env.BACKEND}/food-category`,
    { categoryName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateFood = async (foodId: string, data: any) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("UNAUTHORIZED");
  }

  const response = await axios.patch(
    `${process.env.BACKEND}/food/${foodId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const createFood = async (data: any) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("UNAUTHORIZED");
  }

  const response = await axios.post(
    `${process.env.BACKEND}/food`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};