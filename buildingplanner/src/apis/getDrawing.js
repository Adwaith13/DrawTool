import axios from "axios";

export const getDrawing = async () => {
  const URL = import.meta.env.VITE_URL;

  try {
    const response = await axios.get(`${URL}/getdrawing`);
    return response.data;
  } catch (error) {
    console.error("Error fetching shapes:", error.message);
    throw error;
  }
};
