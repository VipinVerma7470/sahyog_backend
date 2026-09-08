import axios from "axios";

const API_URL = "http://localhost:5000/api/blogs";

export const blogService = {
  // Get all blogs
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // Get single blog
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
};