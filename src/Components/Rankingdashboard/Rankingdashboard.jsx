// import axios from "axios";
// import { useEffect, useState } from "react";
// import { FaArrowLeft, FaGift } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import "./Rankingdashboard.css";

// // Tier Images
// import starterImg from "../../Assets/Pictures/plan1.jpg";
// import legendImg from "../../Assets/Pictures/plan10.jpg";
// import bronzeImg from "../../Assets/Pictures/plan2.jpg";
// import silverImg from "../../Assets/Pictures/plan3.jpg";
// import goldImg from "../../Assets/Pictures/plan4.jpg";
// import platinumImg from "../../Assets/Pictures/plan5.jpg";
// import diamondImg from "../../Assets/Pictures/plan6.jpg";
// import masterImg from "../../Assets/Pictures/plan7.jpg";
// import grandmasterImg from "../../Assets/Pictures/plan8.jpg";
// import eliteImg from "../../Assets/Pictures/plan9.jpg";

// export default function Rankingdashboard() {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const userString = localStorage.getItem("user");
//   const user = userString ? JSON.parse(userString) : null;
//   const userId = user?._id;

//   const ranks = [
//     {
//       name: "Starter",
//       level: 2,
//       personal: 1000,
//       team: 15000,
//       reward: 300,
//       img: starterImg,
//     },
//     {
//       name: "Bronze",
//       level: 2,
//       personal: 2000,
//       team: 25000,
//       reward: 500,
//       img: bronzeImg,
//     },
//     {
//       name: "Silver",
//       level: 3,
//       personal: 3000,
//       team: 50000,
//       reward: 1200,
//       img: silverImg,
//     },
//     {
//       name: "Gold",
//       level: 4,
//       personal: 5000,
//       team: 100000,
//       reward: 2500,
//       img: goldImg,
//     },
//     {
//       name: "Platinum",
//       level: 5,
//       personal: 10000,
//       team: 150000,
//       reward: 4500,
//       img: platinumImg,
//     },
//     {
//       name: "Diamond",
//       level: 6,
//       personal: 15000,
//       team: 200000,
//       reward: 7000,
//       img: diamondImg,
//     },
//     {
//       name: "Master",
//       level: 7,
//       personal: 20000,
//       team: 300000,
//       reward: 10000,
//       img: masterImg,
//     },
//     {
//       name: "Grandmaster",
//       level: 8,
//       personal: 30000,
//       team: 500000,
//       reward: 15000,
//       img: grandmasterImg,
//     },
//     {
//       name: "Elite",
//       level: 9,
//       personal: 40000,
//       team: 700000,
//       reward: 20000,
//       img: eliteImg,
//     },
//     {
//       name: "Legend",
//       level: 10,
//       personal: 50000,
//       team: 1000000,
//       reward: 25000,
//       img: legendImg,
//     },
//   ];

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!userId) {
//         setError("User not logged in");
//         setLoading(false);
//         return;
//       }
//       try {
//         const response = await axios.post("https://be.solarx0.com/team", {
//           userId,
//         });
//         setUserData(response.data);
//       } catch (err) {
//         console.error("Error fetching user data:", err);
//         setError("Failed to load ranking data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   const personalCurrent = userData?.user?.UserInvestment || 0;
//   const teamCurrent = userData?.teamPlanInvestment || 0;

//   const calculateCurrentLevel = () => {
//     for (let i = ranks.length - 1; i >= 0; i--) {
//       if (
//         personalCurrent >= ranks[i].personal &&
//         teamCurrent >= ranks[i].team
//       ) {
//         return i;
//       }
//     }
//     return 0;
//   };

//   const currentLevelIndex = calculateCurrentLevel();

//   const handleClaimReward = async (rankIndex, rewardAmount) => {
//     const rankName = ranks[rankIndex].name;

//     // Check if already claimed based on userData
//     const alreadyClaimed = userData?.user?.claimedRanks?.some(
//       (claimedRank) => claimedRank.rankName === rankName
//     );

//     if (alreadyClaimed) {
//       alert("Reward already claimed!");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "https://be.solarx0.com/api/claimReward",
//         {
//           userId,
//           rank: rankName,
//           reward: rewardAmount,
//         }
//       );

//       if (response.data.success) {
//         alert(
//           `🎉 ${
//             response.data.message
//           }\nNew Balance: PKR ${response.data.newBalance.toLocaleString()}`
//         );

//         // Refresh user data to get updated claimedRanks
//         const updatedResponse = await axios.post(
//           "https://be.solarx0.com/team",
//           {
//             userId,
//           }
//         );
//         setUserData(updatedResponse.data);
//       } else {
//         alert(response.data.message);
//       }
//     } catch (err) {
//       console.error("Claim reward error:", err);
//       console.error("Error response:", err.response?.data);
//       alert(
//         `Failed to claim reward: ${
//           err.response?.data?.message || "Please try again."
//         }`
//       );
//     }
//   };

//   if (loading) {
//     return (
//       <div className="ranking-wrapper">
//         <div className="ranking-header">
//           <Link to="/setting" className="back-link">
//             <FaArrowLeft />
//           </Link>
//           <h2>Ranking Dashboard</h2>
//         </div>
//         <div className="loading">Loading ranking data...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="ranking-wrapper">
//         <div className="ranking-header">
//           <Link to="/setting" className="back-link">
//             <FaArrowLeft />
//           </Link>
//           <h2>Ranking Dashboard</h2>
//         </div>
//         <div className="error">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="ranking-wrapper">
//       <div className="ranking-header">
//         <Link to="/setting" className="back-link">
//           <FaArrowLeft />
//         </Link>
//         <h2>Ranking Dashboard</h2>
//       </div>

//       <div className="ranking-grid">
//         {ranks.map((rank, index) => {
//           const personalProgress = Math.min(
//             (personalCurrent / rank.personal) * 100,
//             100
//           );
//           const teamProgress = Math.min((teamCurrent / rank.team) * 100, 100);
//           const overallProgress = (personalProgress + teamProgress) / 2;

//           // Check if reward is already claimed from backend data
//           const alreadyClaimed = userData?.user?.claimedRanks?.some(
//             (claimedRank) => claimedRank.rankName === rank.name
//           );

//           const canClaim =
//             personalCurrent >= rank.personal && teamCurrent >= rank.team;

//           return (
//             <div key={index} className="rank-card">
//               <div className="rank-top">
//                 <img src={rank.img} alt={rank.name} />
//                 <div className="rank-title">
//                   <h3>{rank.name}</h3>
//                   {index !== 0 && (
//                     <span className="level-pill">Level {rank.level}</span>
//                   )}
//                   {index === currentLevelIndex && (
//                     <span className="current-pill">Current Rank ✅</span>
//                   )}
//                 </div>
//               </div>

//               <div className="progress-section">
//                 <h4>Progress to {rank.name}</h4>
//                 <div className="progress-grid">
//                   {/* Team Investment */}
//                   <div className="progress-box">
//                     <p>
//                       Team Investment Required: PKR {rank.team.toLocaleString()}
//                     </p>
//                     <p>You Invested: PKR {teamCurrent.toLocaleString()}</p>
//                     <p>
//                       More Needed: PKR{" "}
//                       {Math.max(rank.team - teamCurrent, 0).toLocaleString()}
//                     </p>
//                     <div className="progress-bar">
//                       <div
//                         className="progress-fill"
//                         style={{ width: `${teamProgress}%` }}
//                       ></div>
//                     </div>
//                     <span className="progress-percent">
//                       {teamProgress.toFixed(1)}%
//                     </span>
//                   </div>

//                   {/* Personal Investment */}
//                   <div className="progress-box">
//                     <p>
//                       Personal Investment Required: PKR{" "}
//                       {rank.personal.toLocaleString()}
//                     </p>
//                     <p>You Invested: PKR {personalCurrent.toLocaleString()}</p>
//                     <p>
//                       More Needed: PKR{" "}
//                       {Math.max(
//                         rank.personal - personalCurrent,
//                         0
//                       ).toLocaleString()}
//                     </p>
//                     <div className="progress-bar">
//                       <div
//                         className="progress-fill"
//                         style={{ width: `${personalProgress}%` }}
//                       ></div>
//                     </div>
//                     <span className="progress-percent">
//                       {personalProgress.toFixed(1)}%
//                     </span>
//                   </div>

//                   {/* Summary */}
//                   <div className="progress-box">
//                     <p>Your Team Total Investment</p>
//                     <strong>PKR {teamCurrent.toLocaleString()}</strong>
//                   </div>
//                   <div className="progress-box">
//                     <p>Your Total Investment</p>
//                     <strong>PKR {personalCurrent.toLocaleString()}</strong>
//                   </div>
//                 </div>

//                 <div className="progress-bar overall-progress">
//                   <div
//                     className="progress-fill"
//                     style={{ width: `${overallProgress}%` }}
//                   ></div>
//                 </div>
//                 <span className="progress-percent">
//                   {overallProgress.toFixed(1)}%
//                 </span>

//                 {/* Reward Claim */}
//                 {canClaim ? (
//                   alreadyClaimed ? (
//                     <p className="reward claimed">
//                       ✅ Reward Claimed: PKR {rank.reward.toLocaleString()}
//                     </p>
//                   ) : (
//                     <button
//                       className="claim-btn"
//                       onClick={() => handleClaimReward(index, rank.reward)}
//                     >
//                       🎁 Claim Reward (PKR {rank.reward.toLocaleString()})
//                     </button>
//                   )
//                 ) : (
//                   <p className="reward">
//                     <FaGift /> Rank Benefit: PKR {rank.reward.toLocaleString()}{" "}
//                     reward
//                   </p>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaGift } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Rankingdashboard.css";

// Tier Images
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

export default function Rankingdashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?._id;

  const ranks = [
    {
      name: "Starter",
      level: 1,
      personal: 1000,
      team: 15000,
      reward: 100,
      img: starterImg,
    },
    {
      name: "Bronze",
      level: 2,
      personal: 1000,
      team: 25000,
      reward: 200,
      img: bronzeImg,
    },
    {
      name: "Silver",
      level: 3,
      personal: 1000,
      team: 50000,
      reward: 1000,
      img: silverImg,
    },
    {
      name: "Gold",
      level: 4,
      personal: 1000,
      team: 150000,
      reward: 3000,
      img: goldImg,
    },
    {
      name: "Platinum",
      level: 5,
      personal: 1000,
      team: 300000,
      reward: 5000,
      img: platinumImg,
    },
    {
      name: "Diamond",
      level: 6,
      personal: 1000,
      team: 500000,
      reward: 10000,
      img: diamondImg,
    },
    {
      name: "Master",
      level: 7,
      personal: 1000,
      team: 700000,
      reward: 15000,
      img: masterImg,
    },
    {
      name: "Grandmaster",
      level: 8,
      personal: 1000,
      team: 1000000,
      reward: 25000,
      img: grandmasterImg,
    },
    {
      name: "Elite",
      level: 9,
      personal: 1000,
      team: 1500000,
      reward: 35000,
      img: eliteImg,
    },
    {
      name: "Legend",
      level: 10,
      personal: 1000,
      team: 2000000,
      reward: 40000,
      img: legendImg,
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setError("User not logged in");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.post("https://be.solarx0.com/team", {
          userId,
        });
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load ranking data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const personalCurrent = userData?.user?.UserInvestment || 0;
  const teamCurrent = userData?.teamPlanInvestment || 0;

  const calculateCurrentLevel = () => {
    for (let i = ranks.length - 1; i >= 0; i--) {
      if (
        personalCurrent >= ranks[i].personal &&
        teamCurrent >= ranks[i].team
      ) {
        return i;
      }
    }
    return 0;
  };

  const currentLevelIndex = calculateCurrentLevel();

  const handleClaimReward = async (rankIndex, rewardAmount) => {
    const rankName = ranks[rankIndex].name;

    // Check if already claimed based on userData
    const alreadyClaimed = userData?.user?.claimedRanks?.some(
      (claimedRank) => claimedRank.rankName === rankName
    );

    if (alreadyClaimed) {
      alert("Reward already claimed!");
      return;
    }

    try {
      const response = await axios.post(
        "https://be.solarx0.com/api/claimReward",
        {
          userId,
          rank: rankName,
          reward: rewardAmount,
        }
      );

      if (response.data.success) {
        alert(
          `🎉 ${
            response.data.message
          }\nNew Balance: PKR ${response.data.newBalance.toLocaleString()}`
        );

        // Refresh user data to get updated claimedRanks
        const updatedResponse = await axios.post(
          "https://be.solarx0.com/team",
          {
            userId,
          }
        );
        setUserData(updatedResponse.data);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error("Claim reward error:", err);
      console.error("Error response:", err.response?.data);
      alert(
        `Failed to claim reward: ${
          err.response?.data?.message || "Please try again."
        }`
      );
    }
  };

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
      <div className="ranking-header">
        <Link to="/setting" className="back-link">
          <FaArrowLeft />
        </Link>
        <h2>Ranking Dashboard</h2>
      </div>

      <div className="ranking-grid">
        {ranks.map((rank, index) => {
          const personalProgress = Math.min(
            (personalCurrent / rank.personal) * 100,
            100
          );
          const teamProgress = Math.min((teamCurrent / rank.team) * 100, 100);
          const overallProgress = (personalProgress + teamProgress) / 2;

          // Check if reward is already claimed from backend data
          const alreadyClaimed = userData?.user?.claimedRanks?.some(
            (claimedRank) => claimedRank.rankName === rank.name
          );

          const canClaim =
            personalCurrent >= rank.personal && teamCurrent >= rank.team;

          return (
            <div key={index} className="rank-card">
              <div className="rank-top">
                <img src={rank.img} alt={rank.name} />
                <div className="rank-title">
                  <h3>{rank.name}</h3>
                  {index !== 0 && (
                    <span className="level-pill">Level {rank.level}</span>
                  )}
                  {index === currentLevelIndex && (
                    <span className="current-pill">Current Rank ✅</span>
                  )}
                </div>
              </div>

              <div className="progress-section">
                <h4>Progress to {rank.name}</h4>
                <div className="progress-grid">
                  {/* Team Investment */}
                  <div className="progress-box">
                    <p>
                      Team Investment Required: PKR {rank.team.toLocaleString()}
                    </p>
                    <p>You Invested: PKR {teamCurrent.toLocaleString()}</p>
                    <p>
                      More Needed: PKR{" "}
                      {Math.max(rank.team - teamCurrent, 0).toLocaleString()}
                    </p>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${teamProgress}%` }}
                      ></div>
                    </div>
                    <span className="progress-percent">
                      {teamProgress.toFixed(1)}%
                    </span>
                  </div>

                  {/* Personal Investment */}
                  <div className="progress-box">
                    <p>
                      Personal Investment Required: PKR{" "}
                      {rank.personal.toLocaleString()}
                    </p>
                    <p>You Invested: PKR {personalCurrent.toLocaleString()}</p>
                    <p>
                      More Needed: PKR{" "}
                      {Math.max(
                        rank.personal - personalCurrent,
                        0
                      ).toLocaleString()}
                    </p>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${personalProgress}%` }}
                      ></div>
                    </div>
                    <span className="progress-percent">
                      {personalProgress.toFixed(1)}%
                    </span>
                  </div>

                  {/* Summary */}
                  <div id="red" className="progress-box">
                    <p>Your Team Total Investment</p>
                    <strong>PKR {teamCurrent.toLocaleString()}</strong>
                  </div>
                  <div id="red" className="progress-box">
                    <p>Your Total Investment</p>
                    <strong>PKR {personalCurrent.toLocaleString()}</strong>
                  </div>
                </div>

                <div className="progress-bar overall-progress">
                  <div
                    className="progress-fill"
                    style={{ width: `${overallProgress}%` }}
                  ></div>
                </div>
                <span className="progress-percent">
                  {overallProgress.toFixed(1)}%
                </span>

                {/* Reward Claim */}
                {canClaim ? (
                  alreadyClaimed ? (
                    <p className="reward claimed">
                      ✅ Reward Claimed: PKR {rank.reward.toLocaleString()}
                    </p>
                  ) : (
                    <button
                      className="claim-btn"
                      onClick={() => handleClaimReward(index, rank.reward)}
                    >
                      🎁 Claim Reward (PKR {rank.reward.toLocaleString()})
                    </button>
                  )
                ) : (
                  <p className="reward">
                    <FaGift /> Rank Benefit: PKR {rank.reward.toLocaleString()}{" "}
                    reward
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
