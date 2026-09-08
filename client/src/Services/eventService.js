import axios from "axios";

const API_URL = "http://localhost:5000/api/events";

export const eventService = {
  // Get all events
  getAll: async () => {
    const response = await axios.get(API_URL);

    return response.data;
  },

  // Get single event
  getById: async (id) => {
    const response = await axios.get(
      `${API_URL}/${id}`
    );

    return response.data;
  },
};