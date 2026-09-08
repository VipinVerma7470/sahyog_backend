import axios from "axios";

const API_URL =
  "http://localhost:5000/api/contact";

export const contactService = {

  // Contact form
  create: async (data) => {

    const response =
      await axios.post(
        API_URL,
        data
      );

    return response.data;
  },


  // Volunteer registration
  registerVolunteer: async (data) => {

    const response =
      await axios.post(
        `${API_URL}/volunteer`,
        data
      );

    return response.data;
  },


  // Admin - all contacts and volunteers
  getAll: async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(
        API_URL,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  },


  // Admin - details
  getById: async (id) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(
        `${API_URL}/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  },


  // Update status
  updateStatus: async (
    id,
    status
  ) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.put(
        `${API_URL}/${id}/status`,
        { status },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  },


  // Delete
  delete: async (id) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.delete(
        `${API_URL}/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  },

};