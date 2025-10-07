// src/admin/components/Topbar.jsx
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom"; // ✅ Add this
import Sidebar from "../components/Sidebar";
import "../styles/topbar.css";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <Sidebar />
        <h2>Solarx0 Admin Panel</h2>
      </div>

      <div className="topbar-center">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="topbar-right">
        <FaBell className="topbar-icon" />
        <Link to="/" className="admin-profile">
          <FaUserCircle className="profile-icon" />
          <span className="admin-name">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
