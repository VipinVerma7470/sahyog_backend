import "./Topbar.css";

import {
  FaBell,
  FaBars,
  FaUserCircle,
} from "react-icons/fa";

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  contactService,
} from "../../services/contactService";


const Topbar = ({ toggleSidebar }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const [unreadCount, setUnreadCount] =
    useState(0);


  // ===============================
  // Fetch Unread Notifications
  // ===============================

  const fetchNotifications = async () => {

    try {

      const response =
        await contactService.getAll();

      const contacts =
        response.contacts || [];

   const unread =
  contacts.filter(
    (item) =>
      item.type === "CONTACT" &&
      String(item.status || "")
        .toLowerCase() === "unread"
  );

setUnreadCount(unread.length);

    } catch (error) {

      console.error(
        "Fetch Notifications Error:",
        error
      );

    }

  };


  // Initial + route change par refresh
  useEffect(() => {

    fetchNotifications();

  }, [location.pathname]);


  // ===============================
  // Bell Click
  // ===============================

  const handleNotificationClick = () => {

    navigate("/admin/contact");

  };


  return (

    <header className="topbar">

      <div className="topbar-left">

        <button
          className="mobile-menu"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        <h2>Dashboard</h2>

      </div>


      <div className="topbar-right">

        {/* Notification */}

        <div
          className="notification"
          onClick={handleNotificationClick}
          title="View contact messages"
        >

          <FaBell />

          {unreadCount > 0 && (
            <span>
              {unreadCount > 99
                ? "99+"
                : unreadCount}
            </span>
          )}

        </div>


        {/* Admin Profile */}

        <div className="admin-profile">

          <div className="admin-info">

            <h4>Admin</h4>

            <span>
              Super Administrator
            </span>

          </div>

          <FaUserCircle
            className="profile-icon"
          />

        </div>

      </div>

    </header>

  );

};


export default Topbar;