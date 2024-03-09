import axios from "axios";

export const getDrawing = async (token) => {
  const URL = import.meta.env.VITE_URL;

  try {
    const response = await axios.get(`${URL}/getdrawing`, {
      headers: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching shapes:", error.message);
    throw error;
  }
};
