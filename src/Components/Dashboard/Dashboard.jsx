// import { useEffect, useState } from "react";
// import { FaHandHoldingUsd, FaRegMoneyBillAlt } from "react-icons/fa";
// import {
// 	FiArrowLeft,
// 	FiArrowRight,
// 	FiBarChart2,
// 	FiBell,
// 	FiGrid,
// 	FiSettings,
// 	FiUsers,
// } from "react-icons/fi";
// import { Link } from "react-router-dom";

// import "./Dashboard.css";

// import img1 from "../../Assets/Pictures/dash1.jpeg";
// import img2 from "../../Assets/Pictures/dash2.jpeg";
// import img3 from "../../Assets/Pictures/dash3.jpeg";
// import img4 from "../../Assets/Pictures/dash4.jpeg";
// import profile from "../../Assets/Pictures/download.jpeg";
// import Newsboard from "../Newsboard/Newsboard";
// import axios from "axios";

// const slides = [
// 	{
// 		image: img1,
// 		title: "Mining Server Facility",
// 		subtitle: "High-Performance Computing Center",
// 		profit: "$720/day",
// 		hashpower: "4200+ TH/s",
// 		description:
// 			"Professional server room with organized mining hardware and advanced thermal management",
// 	},
// 	{
// 		image: img2,
// 		title: "Solar X Power Hub",
// 		subtitle: "Sustainable Mining Through Solar Energy",
// 		profit: "$650/day",
// 		hashpower: "3900+ TH/s",
// 		description:
// 			"Eco-friendly mining infrastructure using solar power for low-cost, green crypto operations.",
// 	},
// 	{
// 		image: img3,
// 		title: "HelioMine Complex",
// 		subtitle: "Sun-Powered Blockchain Infrastructure",
// 		profit: "$980/day",
// 		hashpower: "6900+ TH/s",
// 		description:
// 			"Advanced ASIC units running on solar arrays for maximum sustainability and ROI.",
// 	},
// 	{
// 		image: img4,
// 		title: "NextGen Solar Vault",
// 		subtitle: "Future-Proof, Zero-Emission Mining",
// 		profit: "$810/day",
// 		hashpower: "5100+ TH/s",
// 		description:
// 			"Solar-powered mining facility with smart energy balancing and uptime optimization.",
// 	},
// ];

// export default function Dashboard() {
// 	const [currentIndex, setCurrentIndex] = useState(0);
// 	const [showAnnouncements, setShowAnnouncements] = useState(false);
// 	const [showPopup, setShowPopup] = useState(true);
// 	const userString = localStorage.getItem("user");
// 	const user = userString ? JSON.parse(userString) : null;
// 	const [announcements, setAnnouncements] = useState([]);
// 	const userId = user?._id;
// 	console.log("User ID:", user);
// 	const [teamData, setTeamData] = useState(null);

// 	useEffect(() => {
// 		const fetchTeamData = async () => {
// 			try {
// 				const res = await axios.post("http://localhost:3005/team", { userId });
// 				setTeamData(res.data);
// 			} catch (err) {
// 				console.error("Error fetching team data:", err);
// 			}
// 		};

// 		fetchTeamData();
// 	}, [userId]);

// 	// show popup only once after login
// 	useEffect(() => {
// 		const hasSeen = sessionStorage.getItem("dashboardPopupShown");
// 		if (!hasSeen) {
// 			setShowPopup(true);
// 			sessionStorage.setItem("dashboardPopupShown", "true");
// 		}
// 	}, []);

// 	useEffect(() => {
// 		const interval = setInterval(() => {
// 			setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
// 		}, 4000);
// 		return () => clearInterval(interval);
// 	}, []);

// 	useEffect(() => {
// 		const fetchAnnouncements = async () => {
// 			try {
// 				const response = await fetch(
// 					"http://localhost:3005/api/announcements1",
// 					{
// 						method: "POST",
// 					}
// 				);
// 				const data = await response.json();
// 				console.log("res", data.data);
// 				if (response.ok) {
// 					setAnnouncements(data.data || []);
// 					console.log("Announcements:", data.announcements);
// 				} else {
// 					console.error("Failed to fetch announcements:", data.message);
// 				}
// 			} catch (error) {
// 				console.error("Error fetching announcements:", error);
// 			}
// 		};

// 		fetchAnnouncements();
// 	}, []);

// 	const handleNext = () => {
// 		setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
// 	};

// 	const handlePrev = () => {
// 		setCurrentIndex(
// 			(prevIndex) => (prevIndex - 1 + slides.length) % slides.length
// 		);
// 	};

// 	const { image, title, subtitle, profit, hashpower, description } =
// 		slides[currentIndex];

// 	return (
// 		<div className="dashboard">
// 			{/* 🔹 Popup (shows only once after login) */}
// 			{/* 🔹 SolarX Popup (shows after login) */}
// 			{showPopup && (
// 				<div className="solarx-popup-overlay">
// 					<div className="solarx-popup">
// 						<div className="popup-header">
// 							<h2>☀️ Solar X</h2>
// 							<button className="close-btn" onClick={() => setShowPopup(false)}>
// 								✖
// 							</button>
// 						</div>

// 						<div className="popup-body">
// 							<ol>
// 								<li style={{ color: "#2945ff" }}>
// 									<strong>Solar X launched in 2025 🚀</strong>
// 								</li>
// 								<li>Contract runs for 2 years.</li>
// 								<li>
// 									Minimum deposit:{" "}
// 									<strong style={{ color: "red" }}>1000 PKR</strong>.
// 								</li>
// 								<li>
// 									Minimum withdrawal:{" "}
// 									<strong style={{ color: "red" }}>100 PKR</strong>.
// 								</li>
// 								<li>
// 									Withdraw profit once balance is{" "}
// 									<strong style={{ color: "red" }}>100 PKR</strong> or more.
// 								</li>
// 								<li>
// 									<strong style={{ color: "red" }}>No withdrawal fee</strong>.
// 								</li>
// 								<li>Join our WhatsApp group for updates 📲</li>
// 								<li className="highlight">
// 									8.Ranking Reward Available And Extra Bouns√ Weekly+Monthly
// 									Salary Coming Soon💰
// 								</li>
// 								<li>
// 									<b>Withdrawal Time:</b> 10:00 AM – 8:00 PM &nbsp; | &nbsp;
// 									<b>Deposit Time:</b> 24/7
// 								</li>
// 							</ol>
// 						</div>

// 						<div className="popup-actions">
// 							<a
// 								href="https://chat.whatsapp.com/"
// 								target="_blank"
// 								rel="noreferrer"
// 								className="popup-btn orange">
// 								Join WhatsApp Group
// 							</a>

// 							<button
// 								className="popup-btn grey"
// 								onClick={() => setShowPopup(false)}>
// 								Close
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			)}

// 			{/* Header */}
// 			<header className="headerd">
// 				<div className="header-leftd">
// 					<img src={profile} alt="profile" className="profile-picd" />
// 				</div>
// 				<div className="header-centerd">
// 					<h1 className="header-titled">SOLAR X DASHBOARD</h1>
// 				</div>
// 				<div className="header-rightd">
// 					<div className="notification-wrapper">
// 						<FiBell
// 							className="header-icond"
// 							title="Notifications"
// 							onClick={() => setShowAnnouncements((prev) => !prev)}
// 						/>
// 						{showAnnouncements && (
// 							<div className="announcement-popup">
// 								<h4>📢 Announcements</h4>
// 								<ul>
// 									{announcements.map((item, index) => (
// 										<li key={item._id || index}>{item.message}</li>
// 									))}
// 								</ul>
// 							</div>
// 						)}
// 					</div>
// 				</div>
// 			</header>

// 			{/* Slider */}
// 			<div className="slider-container">
// 				<img src={image} alt="slider" className="slider-image" />
// 				<button className="slider-btn left" onClick={handlePrev}>
// 					<FiArrowLeft />
// 				</button>
// 				<button className="slider-btn right" onClick={handleNext}>
// 					<FiArrowRight />
// 				</button>
// 				<div className="slider-caption">
// 					<h1 className="bannerh1txt">{title}</h1>
// 					<p className="desc">{subtitle}</p>
// 					<div className="badges">
// 						<span className="badge green">Up to {profit} profit</span>
// 						<span className="badge blue">{hashpower}</span>
// 					</div>
// 					<p className="desc">{description}</p>
// 				</div>
// 			</div>

// 			{/* Actions */}
// 			<div className="actions">
// 				<div className="action-card">
// 					<div className="icon purple">
// 						<FaRegMoneyBillAlt />
// 					</div>
// 					<h2 className="padd">Quick Deposit</h2>
// 					<p className="grey">Deposit your funds 24/7</p>
// 					<button className="card-btn orange">
// 						<Link to="/deposit">Money In</Link>
// 					</button>
// 				</div>
// 				<div className="action-card2">
// 					<div className="icon green">
// 						<FaHandHoldingUsd />
// 					</div>
// 					<h2 className="padd">Quick Withdraw</h2>
// 					<p className="grey">Withdraw your funds 24/7</p>
// 					<button className="card-btn green">
// 						<Link to="/withdraw">Money Out</Link>
// 					</button>
// 				</div>
// 			</div>

// 			{/* Info Cards */}
// 			<div className="info-cards">
// 				<div className="info-card">
// 					<div className="card-top">
// 						<div>
// 							<h2 className="resbal">Total Balance</h2>
// 							<p className="balancepkr">
// 								{teamData?.user?.userbalance || 0} PKR
// 							</p>
// 						</div>
// 					</div>
// 				</div>

// 				<div className="info-card2">
// 					<div className="card-top">
// 						<div>
// 							<h2 className="resbal">Total Withdraw</h2>
// 							<p className="earnpkr">
// 								{teamData?.user?.userTotalWithdrawals || 0} PKR
// 							</p>
// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 			<div className="newsdash">
// 				<Newsboard />
// 			</div>

// 			{/* Bottom Nav */}
// 			<footer className="bottom-nav">
// 				<Link to="/dashboard">
// 					<button>
// 						<FiGrid />
// 						<span>Dashboard</span>
// 					</button>
// 				</Link>
// 				<Link to="/team">
// 					<button>
// 						<FiUsers />
// 						<span>About Team</span>
// 					</button>
// 				</Link>
// 				<Link to="/plans">
// 					<button>
// 						<FiBarChart2 />
// 						<span> Plans</span>
// 					</button>
// 				</Link>
// 				<Link to="/setting">
// 					<button>
// 						<FiSettings />
// 						<span>Settings</span>
// 					</button>
// 				</Link>
// 			</footer>
// 		</div>
// 	);
// }
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { FaHandHoldingUsd, FaRegMoneyBillAlt } from "react-icons/fa";
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

import img1 from "../../Assets/Pictures/dash1.jpeg";
import img2 from "../../Assets/Pictures/dash2.jpeg";
import img3 from "../../Assets/Pictures/dash3.jpeg";
import img4 from "../../Assets/Pictures/dash4.jpeg";
import profile from "../../Assets/Pictures/download.jpeg";
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
  const [announcements, setAnnouncements] = useState([]);
  const [teamData, setTeamData] = useState({ user: {}, plans: [] });

  // ✅ Get user from localStorage
  const user = useMemo(() => {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  }, []);

  const userId = useMemo(() => user?._id, [user]);

  const fetchTeamData = async () => {
    if (!userId) return;
    try {
      const res = await axios.post("http://localhost:3005/team", { userId });
      setTeamData(res.data);
    } catch (err) {
      console.error("Error fetching team data:", err);
    }
  };

  // ✅ Fetch team data once on load
  useEffect(() => {
    fetchTeamData();
  }, [userId]);

  // ✅ Auto-refresh team data every 60s for live balance
  useEffect(() => {
    const interval = setInterval(fetchTeamData, 60000); // every 60s
    return () => clearInterval(interval);
  }, [userId]);

  // ✅ Show popup only once per session
  useEffect(() => {
    const hasSeen = sessionStorage.getItem("dashboardPopupShown");
    if (!hasSeen) {
      setShowPopup(true);
      sessionStorage.setItem("dashboardPopupShown", "true");

      const timer = setTimeout(() => setShowPopup(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  // ✅ Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Fetch announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3005/api/announcements1"
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

  // ✅ Calculate total balance (userbalance + active plans earnings)
  const totalBalance = useMemo(() => {
    const planEarnings =
      teamData?.plans?.reduce((sum, p) => sum + (p.totalEarning || 0), 0) || 0;
    return (teamData?.user?.userbalance || 0) + planEarnings;
  }, [teamData]);

  return (
    <div className="dashboard">
      {/* 🔹 Popup */}
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
                  <strong>Solar X launched in 2025 🚀</strong>
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
                href="https://chat.whatsapp.com/"
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
          <img src={profile} alt="profile" className="profile-picd" />
        </div>
        <div className="header-centerd">
          <h1 className="header-titled">SOLAR X DASHBOARD</h1>
        </div>
        <div className="header-rightd">
          <div className="notification-wrapper">
            <FiBell
              className="header-icond"
              title="Notifications"
              onClick={() => setShowAnnouncements((prev) => !prev)}
            />
            {showAnnouncements && (
              <div className="announcement-popup">
                <h4>📢 Announcements</h4>
                <ul>
                  {announcements.map((item) => (
                    <li key={item._id}>{item.message}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Slider */}
      <div className="slider-container">
        <img src={image} alt="slider" className="slider-image" />
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
            <p className="balancepkr">{totalBalance} PKR</p>
          </div>
        </div>
        <div className="info-card2">
          <div className="card-top">
            <h2 className="resbal">Total Withdraw</h2>
            <p className="earnpkr">
              {teamData?.user?.userTotalWithdrawals || 0} PKR
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
