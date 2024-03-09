import axios from "axios";

export const registerApi = async (userData) => {
  const URL = import.meta.env.VITE_URL;
  try {
    const response = axios.post(`${URL}/register`, userData);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};
