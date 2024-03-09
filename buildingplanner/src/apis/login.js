import axios from "axios";

export const loginApi = async (userData) => {
  const URL = import.meta.env.VITE_URL;
  try {
    const response = await axios.post(`${URL}/login`, userData);
    localStorage.setItem("token", response.data.loginToken);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
