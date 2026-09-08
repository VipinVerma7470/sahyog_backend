import axios from "axios";

const API_URL = "http://localhost:5000/api/gallery";

export const galleryService = {
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(
      `${API_URL}/${id}`
    );

    return response.data;
  },
};