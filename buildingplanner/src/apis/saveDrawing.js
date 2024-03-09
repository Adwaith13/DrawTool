import axios from "axios";

export const saveDrawing = async (drawingdata, token) => {
  const URL = import.meta.env.VITE_URL;
  try {
    const response = await axios.post(
      `${URL}/save`,
      { shapes: drawingdata },
      {
        headers: {
          token: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
