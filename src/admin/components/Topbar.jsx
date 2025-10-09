// src/admin/components/Topbar.jsx

import { Link } from "react-router-dom"; // ✅ Add this
import solarxlogoadmin from "../../Assets/Pictures/solarxlogoadmin.jpeg";
import Sidebar from "../components/Sidebar";
import "../styles/topbar.css";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <Sidebar />
        <h2>Solarx0 Admin Panel</h2>
      </div>

      <div className="topbar-right">
        <Link to="/" className="admin-profile">
          <img className="solarxlogoadmin" src={solarxlogoadmin} alt="" />
          <span className="admin-name">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
