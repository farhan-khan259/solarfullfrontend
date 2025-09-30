// import { useState, useEffect } from "react";
import { FaArrowLeft, FaGift } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Rankingdashboard.css";

// Tier images
import starterImg from "../../Assets/Pictures/plan1.jpg";
import legendImg from "../../Assets/Pictures/plan10.jpg";
import bronzeImg from "../../Assets/Pictures/plan2.jpg";
import silverImg from "../../Assets/Pictures/plan3.jpg";
import goldImg from "../../Assets/Pictures/plan4.jpg";
import platinumImg from "../../Assets/Pictures/plan5.jpg";
import diamondImg from "../../Assets/Pictures/plan6.jpg";
import masterImg from "../../Assets/Pictures/plan7.jpg";
import grandmasterImg from "../../Assets/Pictures/plan8.jpg";
import eliteImg from "../../Assets/Pictures/plan9.jpg";
import { useEffect, useState } from "react";

export default function Rankingdashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get user ID from localStorage
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?._id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const response = await axios.post(`http://localhost:3005/team`, {
          userId: userId,
        });
        setUserData(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load ranking data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const ranks = [
    {
      name: "Starter",
      personal: 0,
      team: 0,
      reward: 0,
      img: starterImg,
    },
    {
      name: "Bronze",
      level: 1,
      personal: 1000,
      team: 25000,
      reward: 500,
      img: bronzeImg,
    },
    {
      name: "Silver",
      level: 2,
      personal: 3000,
      team: 50000,
      reward: 1200,
      img: silverImg,
    },
    {
      name: "Gold",
      level: 3,
      personal: 5000,
      team: 100000,
      reward: 2500,
      img: goldImg,
    },
    {
      name: "Platinum",
      level: 4,
      personal: 10000,
      team: 150000,
      reward: 4500,
      img: platinumImg,
    },
    {
      name: "Diamond",
      level: 5,
      personal: 15000,
      team: 200000,
      reward: 7000,
      img: diamondImg,
    },
    {
      name: "Master",
      level: 6,
      personal: 20000,
      team: 300000,
      reward: 10000,
      img: masterImg,
    },
    {
      name: "Grandmaster",
      level: 7,
      personal: 30000,
      team: 500000,
      reward: 15000,
      img: grandmasterImg,
    },
    {
      name: "Elite",
      level: 8,
      personal: 40000,
      team: 700000,
      reward: 20000,
      img: eliteImg,
    },
    {
      name: "Legend",
      level: 9,
      personal: 50000,
      team: 1000000,
      reward: 25000,
      img: legendImg,
    },
  ];

  // Calculate user's current level based on investments
  const calculateCurrentLevel = () => {
    if (!userData) return 0;

    const personalInvestment = Math.abs(userData.user.amount) || 0;
    const teamInvestment =
      userData.directReferrals?.stats?.totalTeamDeposit || 0;

    for (let i = ranks.length - 1; i >= 0; i--) {
      if (
        personalInvestment >= ranks[i].personal &&
        teamInvestment >= ranks[i].team
      ) {
        return i;
      }
    }

    return 0;
  };

  const currentLevelIndex = calculateCurrentLevel();
  const currentLevel = ranks[currentLevelIndex];

  if (loading) {
    return (
      <div className="ranking-wrapper">
        <div className="ranking-header">
          <Link to="/setting" className="back-link">
            <FaArrowLeft />
          </Link>
          <h2>Ranking Dashboard</h2>
        </div>
        <div className="loading">Loading ranking data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ranking-wrapper">
        <div className="ranking-header">
          <Link to="/setting" className="back-link">
            <FaArrowLeft />
          </Link>
          <h2>Ranking Dashboard</h2>
        </div>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="ranking-wrapper">
      {/* Header */}
      <div className="ranking-header">
        <Link to="/setting" className="back-link">
          <FaArrowLeft />
        </Link>
        <h2>Ranking Dashboard</h2>
      </div>

      {/* Current Rank Summary */}

      {/* Rank Cards */}
      <div className="ranking-grid">
        {ranks.map((rank, index) => {
          const nextRank = ranks[index + 1];

          // Get actual user investments
          const personalCurrent = Math.abs(userData?.user?.amount) || 0;
          const teamCurrent =
            userData?.directReferrals?.stats?.totalTeamDeposit || 0;

          let progress = 0;
          if (nextRank && index === currentLevelIndex) {
            const totalCurrent = personalCurrent + teamCurrent;
            const totalNextRequired = nextRank.personal + nextRank.team;
            progress = (totalCurrent / totalNextRequired) * 100;
            if (progress > 100) progress = 100;
          }

          return (
            <div key={index} className="rank-card">
              {/* Top Section */}
              <div className="rank-top">
                <img src={rank.img} alt={rank.name} />
                <div className="rank-title">
                  <h3>{rank.name}</h3>

                  {/* Show Level for all ranks except starter */}
                  {index !== 0 && rank.level && (
                    <span className="level-pill">Level {rank.level}</span>
                  )}

                  {/* Current rank badge */}
                  {index === currentLevelIndex && (
                    <span className="current-pill">Current Rank ✅</span>
                  )}
                </div>
              </div>

              {/* Requirements */}
              <div className="requirements">
                <div className="requirement">
                  <span> Investment:</span>
                  <strong>PKR {userData.user.UserInvestment}</strong>
                </div>
                <div className="requirement">
                  <span>Team Investment:</span>
                  <strong>
                    PKR {userData.directReferrals?.stats?.totalTeamDeposit || 0}
                  </strong>
                </div>
              </div>

              {/* Next Rank Goal (only for current rank) */}
              {nextRank && index === currentLevelIndex && (
                <div className="next-goal">
                  <h4>
                    Next Rank Goal: <span>{nextRank.name}</span>
                  </h4>
                  <div className="goal-boxes">
                    <div className="blue-box">
                      Team Investment: PKR {nextRank.team}
                      <div className="needed">
                        More Needed{" "}
                        {nextRank.team - teamCurrent > 0
                          ? nextRank.team - teamCurrent
                          : 0}{" "}
                        PKR
                      </div>
                    </div>
                    <div className="blue-box">
                      Personal Investment: PKR {nextRank.personal}
                      <div className="needed">
                        More Needed{" "}
                        {nextRank.personal - personalCurrent > 0
                          ? nextRank.personal - personalCurrent
                          : 0}{" "}
                        PKR
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Current Investments */}
              <div className="current-investments">
                <div className="orange-box">
                  Your Team Total Investment
                  <strong> PKR {teamCurrent}</strong>
                </div>
                <div className="orange-box">
                  Your Total Investment
                  <strong> PKR {userData.user.UserInvestment}</strong>
                </div>
              </div>

              {/* Progress (only for current rank) */}
              {nextRank && index === currentLevelIndex && (
                <div className="progress-section">
                  <p>
                    Progress to Next Rank{" "}
                    <span className="next-pill">{nextRank.name}</span>
                  </p>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-percent">
                    {progress.toFixed(0)}%
                  </span>
                </div>
              )}

              {/* Reward */}
              <p className="reward">
                <FaGift /> Rank Benefit: PKR {rank.reward} reward
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
