import React, { useState } from "react";
import "./Settings.css";
import { FaLock } from "react-icons/fa";
import { authService } from "../../services/authService";

const Settings = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      alert(
        "New password and confirm password do not match"
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await authService.changePassword(
          formData
        );

      alert(response.message);

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (error) {
      console.error(
        "Change Password Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to change password"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">

      <div className="settings-header">
        <h2>Settings</h2>

        <p>
          Manage your admin account settings.
        </p>
      </div>

      <div className="password-card">

        <div className="password-card-header">

          <div className="password-icon">
            <FaLock />
          </div>

          <div>
            <h3>Change Password</h3>

            <p>
              Update your admin account password
            </p>
          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="password-form"
        >

          <div className="password-field">

            <label>
              Current Password
            </label>

            <input
              type="password"
              name="currentPassword"
              value={
                formData.currentPassword
              }
              onChange={handleChange}
              placeholder="Enter current password"
              required
            />

          </div>

          <div className="password-field">

            <label>
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              value={
                formData.newPassword
              }
              onChange={handleChange}
              placeholder="Enter new password"
              minLength="6"
              required
            />

          </div>

          <div className="password-field">

            <label>
              Confirm New Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={
                formData.confirmPassword
              }
              onChange={handleChange}
              placeholder="Confirm new password"
              minLength="6"
              required
            />

          </div>

          <button
            type="submit"
            className="change-password-btn"
            disabled={loading}
          >
            {loading
              ? "Updating..."
              : "Change Password"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default Settings;