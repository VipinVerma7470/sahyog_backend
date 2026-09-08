import axios from "axios";

const API_URL =
  "http://localhost:5000/api/auth";

export const authService = {

  // ===============================
  // Admin Login
  // ===============================

  login: async (data) => {

    const response =
      await axios.post(
        `${API_URL}/login`,
        data
      );

    return response.data;
  },


  // ===============================
  // Change Admin Password
  // ===============================

  changePassword: async (data) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.put(
        `${API_URL}/change-password`,
        data,
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