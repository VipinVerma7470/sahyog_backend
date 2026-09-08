import "./Sidebar.css";

import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaBook,
  FaCalendarAlt,
  FaImages,
  FaDonate,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaBlog,
  FaEnvelope,
} from "react-icons/fa";

import { useState } from "react";

const Sidebar = () => {
  const [collapse, setCollapse] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    // Remove token and admin data
    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("admin");

    // Redirect to Login Page
    navigate("/admin/login");
  };

  return (
    <div className={collapse ? "sidebar collapse" : "sidebar"}>
      <div className="sidebar-top">
        <div className="logo">
          <h2>SAHYOG</h2>

          <span>Admin Panel</span>
        </div>

        <button
          className="collapse-btn"
          onClick={() => setCollapse(!collapse)}
        >
          <FaBars />
        </button>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink to="/admin">
              <FaHome />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/programs">
              <FaBook />
              <span>Programs</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/events">
              <FaCalendarAlt />
              <span>Events</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/gallery">
              <FaImages />
              <span>Gallery</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/blogs">
              <FaBlog />
              <span>Blogs</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/donations">
              <FaDonate />
              <span>Donations</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/contact">
              <FaEnvelope />
              <span>Contact</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/settings">
              <FaCog />
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="sidebar-bottom">
        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;