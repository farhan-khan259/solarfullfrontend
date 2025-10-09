import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaHandHoldingUsd, FaRegMoneyBillAlt } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";

import {
  FiArrowLeft,
  FiArrowRight,
  FiBarChart2,
  FiBell,
  FiGrid,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import "./Dashboard.css";

import img2 from "../../Assets/Pictures/2new.jpeg";
import img1 from "../../Assets/Pictures/dash1.jpeg";
import img3 from "../../Assets/Pictures/dash3.jpeg";
import img4 from "../../Assets/Pictures/dash4.jpeg";
import profileImg from "../../Assets/Pictures/download.jpeg";
import Newsboard from "../Newsboard/Newsboard";

const slides = [
  {
    image: img1,
    title: "Mining Server Facility",
    subtitle: "High-Performance Computing Center",
    profit: "$720/day",
    hashpower: "4200+ TH/s",
    description:
      "Professional server room with organized mining hardware and advanced thermal management",
  },
  {
    image: img2,
    title: "Solar X Power Hub",
    subtitle: "Sustainable Mining Through Solar Energy",
    profit: "$650/day",
    hashpower: "3900+ TH/s",
    description:
      "Eco-friendly mining infrastructure using solar power for low-cost, green crypto operations.",
  },
  {
    image: img3,
    title: "HelioMine Complex",
    subtitle: "Sun-Powered Blockchain Infrastructure",
    profit: "$980/day",
    hashpower: "6900+ TH/s",
    description:
      "Advanced ASIC units running on solar arrays for maximum sustainability and ROI.",
  },
  {
    image: img4,
    title: "NextGen Solar Vault",
    subtitle: "Future-Proof, Zero-Emission Mining",
    profit: "$810/day",
    hashpower: "5100+ TH/s",
    description:
      "Solar-powered mining facility with smart energy balancing and uptime optimization.",
  },
];

export default function Dashboard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [teamData, setTeamData] = useState({
    user: {},
    plans: [],
    commissionSummary: {},
  });
  const [loading, setLoading] = useState(false);

  // ✅ Get user from localStorage
  const user = useMemo(() => {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  }, []);

  const userId = useMemo(() => user?._id, [user]);

  // ✅ useCallback for fetchTeamData
  const fetchTeamData = useCallback(async () => {
    if (!userId) return;
    setLoading(true); // Set loading to true when fetching data
    try {
      const res = await axios.post("https://be.solarx0.com/team", { userId });
      setTeamData(res.data);
    } catch (err) {
      console.error("Error fetching team data:", err);
    } finally {
      setLoading(false); // Set loading to false when fetching is done
    }
  }, [userId]);

  useEffect(() => {
    fetchTeamData();
  }, [fetchTeamData]);

  useEffect(() => {
    const interval = setInterval(fetchTeamData, 60000);
    return () => clearInterval(interval);
  }, [fetchTeamData]);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("dashboardPopupShown");
    if (!hasSeen) {
      setShowPopup(true);
      sessionStorage.setItem("dashboardPopupShown", "true");

      const timer = setTimeout(() => setShowPopup(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.post(
          "https://be.solarx0.com/api/announcements1"
        );
        if (response.status === 200) {
          setAnnouncements(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
    fetchAnnouncements();
  }, []);

  const { image, title, subtitle, profit, hashpower, description } =
    slides[currentIndex];

  // ✅ Total Balance = wallet balance + plans + commissions
  const totalBalance = useMemo(() => {
    const planEarnings =
      teamData?.plans?.reduce((sum, p) => sum + (p.totalEarning || 0), 0) || 0;
    const commissions = teamData?.commissionSummary?.grandTotalCommission || 0;
    return (teamData?.user?.userbalance || 0) + planEarnings + commissions;
  }, [teamData]);

  return (
    <div className="dashboard">
      {/* Popup */}
      {showPopup && (
        <div className="solarx-popup-overlay">
          <div className="solarx-popup">
            <div className="popup-header">
              <h2>☀️ Solar X</h2>
              <button className="close-btn" onClick={() => setShowPopup(false)}>
                ✖
              </button>
            </div>
            <div className="popup-body">
              <ol>
                <li style={{ color: "#2945ff" }}>
                  <strong>
                    Solar X will be launched in Pakistan 07/10/2025
                  </strong>
                </li>
                <li>Contract runs for 2 years.</li>
                <li>
                  Minimum deposit:{" "}
                  <strong style={{ color: "red" }}>1000 PKR</strong>.
                </li>
                <li>
                  Minimum withdrawal:{" "}
                  <strong style={{ color: "red" }}>100 PKR</strong>.
                </li>
                <li>
                  Withdraw profit once balance is{" "}
                  <strong style={{ color: "red" }}>100 PKR</strong> or more.
                </li>
                <li>
                  <strong style={{ color: "red" }}>No withdrawal fee</strong>.
                </li>
                <li>Join our WhatsApp group for updates 📲</li>
                <li className="highlight">
                  Ranking Reward & Bonus Weekly+Monthly 💰
                </li>
                <li>
                  <b>Withdrawal Time:</b> 10:00 AM – 8:00 PM &nbsp; | &nbsp;{" "}
                  <b>Deposit Time:</b> 24/7
                </li>
              </ol>
            </div>
            <div className="popup-actions">
              <a
                href="https://chat.whatsapp.com/FjcgxLqlfzW7HGqvBigxjo?mode=ems_copy_t"
                target="_blank"
                rel="noreferrer"
                className="popup-btn orange"
              >
                Join WhatsApp Group
              </a>
              <button
                className="popup-btn grey"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="headerd">
        <div className="header-leftd">
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
        <div className="header-centerd">
          <h1 className="header-titled">SOLAR X DASHBOARD</h1>
        </div>
        <div className="header-rightd">
          <div className="notification-wrapper">
            <div
              className="notification-icon"
              onClick={() => setShowAnnouncements((prev) => !prev)}
            >
              <FiBell className="header-icond" title="Notifications" />
              {announcements.length > 0 && (
                <span className="notification-badge">
                  {announcements.length}
                </span>
              )}
            </div>

            {showAnnouncements && (
              <div className="announcement-popup">
                <h4>📢 Announcements</h4>
                <ul className="announcement-list">
                  {announcements.length > 0 ? (
                    announcements.map((item, index) => {
                      const colors = ["orange", "blue"];
                      const colorClass = colors[index % colors.length];
                      return (
                        <li
                          key={item._id}
                          className={`announcement-item ${colorClass}`}
                        >
                          <div className="announcement-box">
                            <p>{item.message}</p>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <li className="announcement-item grey">
                      <div className="announcement-box">
                        <p>No new announcements</p>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Slider */}
      <div className="slider-container">
        <img src={image} alt={title} className="slider-image" />
        <button
          className="slider-btn left"
          onClick={() =>
            setCurrentIndex(
              (prev) => (prev - 1 + slides.length) % slides.length
            )
          }
        >
          <FiArrowLeft />
        </button>
        <button
          className="slider-btn right"
          onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
        >
          <FiArrowRight />
        </button>
        <div className="slider-caption">
          <h1 className="bannerh1txt">{title}</h1>
          <p className="desc">{subtitle}</p>
          <div className="badges">
            <span className="badge green">Up to {profit} profit</span>
            <span className="badge blue">{hashpower}</span>
          </div>
          <p className="desc">{description}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="actions">
        <div className="action-card">
          <div className="icon purple">
            <FaRegMoneyBillAlt />
          </div>
          <h2 className="padd">Quick Deposit</h2>
          <p className="grey">Deposit your funds 24/7</p>
          <button className="card-btn orange">
            <Link to="/deposit">Money In</Link>
          </button>
        </div>
        <div className="action-card2">
          <div className="icon green">
            <FaHandHoldingUsd />
          </div>
          <h2 className="padd">Quick Withdraw</h2>
          <p className="grey">Withdraw your funds 24/7</p>
          <button className="card-btn green">
            <Link to="/withdraw">Money Out</Link>
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="info-cards">
        <div className="info-card">
          <div className="card-top">
            <h2 className="resbal">Total Balance</h2>
            <p className="balancepkr">
              {teamData?.user?.userbalance
                ? teamData.user.userbalance.toFixed(1)
                : 0}{" "}
              PKR
            </p>
            {/* Refresh Button */}
            <button
              className="refresh-btn"
              onClick={fetchTeamData}
              title="Refresh Balance"
            >
              <FiRefreshCcw className={loading ? "spin-icon" : ""} />
            </button>
          </div>
        </div>
        <div className="info-card2">
          <div className="card-top">
            <h2 className="resbal">Total Withdraw</h2>
            <p className="earnpkr">
              {(teamData?.user?.userTotalWithdrawals || 0).toLocaleString()} PKR
            </p>
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="newsdash">
        <Newsboard />
      </div>

      {/* Bottom Nav */}
      <footer className="bottom-nav">
        <Link to="/dashboard">
          <button>
            <FiGrid />
            <span>Dashboard</span>
          </button>
        </Link>
        <Link to="/team">
          <button>
            <FiUsers />
            <span>About Team</span>
          </button>
        </Link>
        <Link to="/plans">
          <button>
            <FiBarChart2 />
            <span>Plans</span>
          </button>
        </Link>
        <Link to="/setting">
          <button>
            <FiSettings />
            <span>Settings</span>
          </button>
        </Link>
      </footer>
    </div>
  );
}
