import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaChevronRight,
  FaHistory,
  FaInfoCircle,
  FaLifeRing,
  FaSignOutAlt,
  FaTicketAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import profileImg from "../../Assets/Pictures/download.jpeg";
import "./Settings.css";

export default function Settings() {
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?._id;

  const [teamData, setTeamData] = useState(null);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }

    const fetchTeamData = async () => {
      try {
        const res = await axios.post("https://be.solarx0.com/team", { userId });
        setTeamData(res.data);
      } catch (err) {
        console.error("Error fetching team data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [userId, navigate]);

  const handleLogoutUser = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const totalDeposits = teamData?.user?.userTotalDeposits || 0;

  if (loading) return <p>Loading...</p>;

  return (
    <div className="settings-container">
      <div className="settings-header">
        <Link to="/dashboard">
          <FaArrowLeft className="back-icon" />
        </Link>
        <h2>Settings</h2>
        <img
          src={
            user?.profilepicture
              ? `https://be.solarx0.com${user.profilepicture}`
              : profileImg
          }
          className="header-avatar"
          onClick={() => setShowProfilePopup(!showProfilePopup)}
          alt="Profile"
        />
      </div>

      {showProfilePopup && (
        <div className="profile-popup">
          <p className="email grey">{user.email}</p>
          <button className="logout-btn" onClick={handleLogoutUser}>
            Logout
          </button>
        </div>
      )}

      <div className="profile-card">
        <div className="avatar-container">
          <img
            src={
              user?.profilepicture
                ? `https://be.solarx0.com${user.profilepicture}`
                : profileImg
            }
            className="user-avatar"
            alt="User"
          />
        </div>
        <div className="user-info">
          <p className="uid">UID: {teamData?.user?.randomCode || "N/A"}</p>
          <p className="email">{teamData?.user?.userCreateDate || "N/A"}</p>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="balance-row">
        <div style={{ background: "#0ede26ff" }} className="balance-card">
          <p className="balance-title">Total Deposit</p>
          <span>
            <strong style={{ color: "#fff" }}>PKR {totalDeposits}</strong>
          </span>
        </div>

        <div style={{ background: "#f9ac1e" }} className="balance-card">
          <p className="balance-title">Total Team Commission</p>
          <span>
            <strong style={{ color: "#fff" }}>
              PKR {teamData?.commissionSummary?.grandTotalCommission || 0}
            </strong>
          </span>
        </div>
      </div>

      <div className="menu-list">
        <Link to="/profile">
          <MenuItem icon={<FaUser />} label="Profile" />
        </Link>
        <Link to="/rankingdashboard">
          <MenuItem icon={<FaUsers />} label="Ranking Levels" />
        </Link>
        <Link to="/promocode">
          <MenuItem icon={<FaTicketAlt />} label="Promo Code" />
        </Link>
        <Link to="/transactionhistory">
          <MenuItem icon={<FaHistory />} label="Transaction History" />
        </Link>
        <Link to="/activeplans">
          <MenuItem icon={<MdAssignmentTurnedIn />} label="Active Plans" />
        </Link>
        <Link to="/support">
          <MenuItem icon={<FaLifeRing />} label="Service Management" />
        </Link>
        <Link to="/ourinfo">
          <MenuItem icon={<FaInfoCircle />} label="Our Information Solar X" />
        </Link>

        {/* Logout Menu */}
        <div className="menu-item logout-item" onClick={handleLogoutUser}>
          <div className="menu-icon">
            <FaSignOutAlt />
          </div>
          <span className="menu-label">Logout</span>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ icon, label }) {
  return (
    <div className="menu-item">
      <div className="menu-icon">{icon}</div>
      <span className="menu-label">{label}</span>
      <FaChevronRight className="arrow-icon" />
    </div>
  );
}
