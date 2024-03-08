import axios from "axios";

export const saveDrawing = async (drawingdata) => {
  const URL = import.meta.env.VITE_URL;
  try {
    const response = await axios.post(`${URL}/save`, { shapes: drawingdata });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
