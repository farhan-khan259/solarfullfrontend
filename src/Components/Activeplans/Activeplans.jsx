import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Activeplans.css";

export default function Activeplans() {
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const id = user?._id;

  // 👇 Plans array instead of single plan
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Countdown Timer (24h for example)
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);

  useEffect(() => {
    // Fetch plan from backend
    const fetchPlan = async () => {
      try {
        const res = await axios.get(`https://be.solarx0.com/api/plans/`, {
          params: { id },
        });
        if (res.data.success) {
          setPlans(res.data.plans); // 👈 set all plans
        }
        console.log(res.data.plans);
      } catch (err) {
        console.error("Error fetching plan:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}h ${m}m ${s}s Left`;
  };

  if (loading) return <p>Loading plan details...</p>;

  if (plans.length === 0) {
    return (
      <div className="active-container">
        <div className="active-card">
          <p className="notactive">No Active Plan</p>
          <Link to="/plans">Go back to plans</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="active-container">
      <div className="active-card">
        {/* Top bar */}
        <div className="active-top">
          <Link to="/setting" className="back-link">
            <FaArrowLeft className="back-icon" />
          </Link>
          <h1 className="active-heading">Active Plan Detail’s</h1>
        </div>

        {/* 🔥 Earning Stats (Combined from all plans) */}
        <div className="stats-row">
          <div className="stat-box blue-green">
            <p>Today Earning</p>
            <h3>
              {plans.reduce((sum, p) => sum + (p.dailyEarning || 0), 0)} PKR
            </h3>
          </div>
          <div className="stat-box blue-green">
            <p>Total Earning</p>
            <h3>
              {plans.reduce((sum, p) => sum + (p.totalEarning || 0), 0)} PKR
            </h3>
          </div>
        </div>

        {/* Buttons */}
        <div className="btn-row">
          <button className="btn orange">Active Plan</button>
        </div>

        {/* 🔄 Loop through each plan */}
        {plans.map((plan, index) => (
          <div key={plan._id || index} className="plan-section">
            {/* Plan Title */}
            <div className="plan-title-box">
              <h2>{plan.PlanName}</h2>
            </div>

            {/* Circular Timer */}
            <div className="circle-timer">
              <p className="circle-title">Plan Active Timer ⏳</p>
              <p className="circle-time">{formatTime(timeLeft)}</p>
            </div>

            {/* Plan Info */}
            <div className="more-info">
              <h3>More Information ℹ️</h3>
              <div className="info-item">
                <b>Investment:</b>{" "}
                <span className="red">{plan.Investment} PKR</span>
              </div>
              <div className="info-item">
                <b>Daily Earning:</b>{" "}
                <span className="blue">{plan.dailyEarning} PKR</span>
              </div>
              {/* <div className="info-item">
                <b>Total Earning:</b>{" "}
                <span className="red">{plan.totalEarning} PKR</span>
              </div> */}
              {/* <div className="info-item">
                <b>Expiring Day’s:</b>{" "}
                <span className="pink">{plan.planExpireText}</span>
              </div> */}
              <div className="info-item">
                <b>Start Date:</b>{" "}
                <span className="blue">
                  {new Date(plan.createdAt).toLocaleString()}
                </span>
              </div>
              <div style={{ textAlign: "center" }} className="info-item">
                <b>
                  WHATEVER PLAN YOU CHOOSE IN SOLAR X,THERE IS NO VALIDITY FOR
                  THIS PLAN , WHICH MEANS THAT WHATEVER PLAN YOU PURCHASE ,YOU
                  WILL RECEIVE DAILY PROFITS FOR A LIFETIME.{" "}
                </b>{" "}
              </div>
              {/* <div className="info-item">
                <b>Last Date:</b>{" "}
                <span className="blue">
                  {new Date(plan.expiryDate).toLocaleString()}
                </span>
              </div> */}
            </div>

            {/* ✅ Show "Capital Back" only after the last plan */}
            {index === plans.length - 1 && (
              <div className="capital-box">Life Time ⌚ Earning💸</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
