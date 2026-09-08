import "./Login.css";

import { useState } from "react";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import loginImage from "../../assets/admin1.jpg";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const {
        token,
        admin,
      } = response.data;

      // Remember Me checked hai
     localStorage.setItem("token", token);
localStorage.setItem("admin", JSON.stringify(admin));

      alert(
        response.data.message
      );

      navigate(
        "/admin"
      );
    } catch (error) {
      console.error(
        "Login Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-login">

      <div className="login-left">

        <img
          src={loginImage}
          alt="Admin Login"
        />

        <div className="left-overlay">

          <h1>
            SAHYOG
          </h1>

          <h2>
            Welfare Foundation
          </h2>

          <p>
            Welcome to the Admin Dashboard.
            Manage Programs, Events,
            Gallery and Donations from
            one secure place.
          </p>

        </div>

      </div>

      <div className="login-right">

        <form
          className="login-card"
          onSubmit={handleSubmit}
        >

          <span className="login-tag">
            ADMIN PANEL
          </span>

          <h2>
            Welcome Back 
          </h2>

          <p>
            Login to continue
          </p>

          <div className="input-group">

            <label>
              Email Address
            </label>

            <div className="input-box">

              <FaEnvelope
                className="input-icon"
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <div className="input-group">

            <label>
              Password
            </label>

            <div className="input-box">

              <FaLock
                className="input-icon"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <span
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </span>

            </div>

          </div>

          <div className="login-options">

            <label className="remember-me">

              <input
                type="checkbox"
                name="remember"
                checked={
                  formData.remember
                }
                onChange={handleChange}
              />

              Remember Me

            </label>

            <a
              href="/forgot-password"
            >
              Forgot Password?
            </a>

          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

          <div className="login-footer">

            <p>
              © 2026 Sahyog Welfare Foundation
            </p>

          </div>

        </form>

      </div>

    </section>
  );
};

export default Login;