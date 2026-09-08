import "./Topbar.css";

import { FaSearch, FaBell, FaBars, FaUserCircle } from "react-icons/fa";

const Topbar = ({ toggleSidebar }) => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="mobile-menu" onClick={toggleSidebar}>
          <FaBars />
        </button>

        <h2>Dashboard</h2>
      </div>

      {/* <div className="topbar-search">
        <FaSearch />

        <input type="text" placeholder="Search here..." />
      </div> */}

      <div className="topbar-right">
        <div className="notification">
          <FaBell />

          <span>3</span>
        </div>
        {/* Admin Profile */}

        <div className="admin-profile">
          {/* <img src="https://i.pravatar.cc/150?img=12" alt="Admin" /> */}

          <div className="admin-info">
            <h4>Admin</h4>

            <span>Super Administrator</span>
          </div>

          <FaUserCircle className="profile-icon" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
