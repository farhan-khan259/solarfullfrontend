import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Transactionhistory.css";

export default function Transactionhistory() {
  const [type, setType] = useState("deposit"); // deposit | withdraw | commission
  const [status, setStatus] = useState("pending");
  const [level, setLevel] = useState("directReferrals"); // commission: direct | indirect | extended
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState(null);

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const userId = user?._id;

  // ✅ Fetch Team Data
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const res = await axios.post("https://be.solarx0.com/team", {
          userId: userId,
        });
        setTeamData(res.data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [userId]);

  if (!userId) return <div>Plz Login User </div>;
  if (loading) return <p>Loading...</p>;
  if (!teamData) return <p>No data available.</p>;

  // ✅ Commission Levels
  const commissionLevels = {
    directReferrals: { label: "Level 1", rate: 0.08 },
    indirectReferrals: { label: "Level 2", rate: 0.03 },
    extendedReferrals: { label: "Level 3", rate: 0.02 },
  };

  // ✅ Payments
  const payments = teamData?.payment || [];
  const depositPayments = payments.filter((p) => p.depositsAmount);
  const withdrawPayments = payments.filter((p) => p.withdrawalsAmount);

  let transactionList = [];
  if (type === "deposit") {
    transactionList = depositPayments.filter((p) => {
      if (status === "pending") return p.depositStatus === "pending";
      if (status === "complete") return p.depositStatus === "approved";
      if (status === "rejected") return p.depositStatus === "rejected";
      return true;
    });
  } else if (type === "withdraw") {
    transactionList = withdrawPayments.filter((p) => {
      if (status === "pending") return p.withdrawalStatus === "pending";
      if (status === "complete") return p.withdrawalStatus === "approved";
      if (status === "rejected") return p.withdrawalStatus === "rejected";
      return true;
    });
  }

  return (
    <div className="transaction-container">
      <div className="transaction-header">
        <Link to="/setting" className="back-linkth">
          <FaArrowLeft />
        </Link>
        <h2 className="transaction-title">Transaction History</h2>
      </div>

      {/* Top Tabs */}
      <div className="type-tabs">
        <button
          className={type === "deposit" ? "active" : ""}
          onClick={() => setType("deposit")}
        >
          Deposit History
        </button>
        <button
          className={type === "withdraw" ? "active" : ""}
          onClick={() => setType("withdraw")}
        >
          Withdraw History
        </button>
        <button
          className={type === "commission" ? "active" : ""}
          onClick={() => setType("commission")}
        >
          Commission History
        </button>
      </div>

      {/* Status Tabs */}
      {type !== "commission" && (
        <div className="status-tabs">
          <button
            className={status === "pending" ? "active" : ""}
            onClick={() => setStatus("pending")}
          >
            PENDING
          </button>
          <button
            className={status === "complete" ? "active" : ""}
            onClick={() => setStatus("complete")}
          >
            COMPLETE
          </button>
          <button
            className={status === "rejected" ? "active" : ""}
            onClick={() => setStatus("rejected")}
          >
            REJECTED
          </button>
        </div>
      )}

      {/* Commission History */}
      {type === "commission" && (
        <div className="commission-section">
          <div className="level-tabs">
            {Object.keys(commissionLevels).map((key) => (
              <button
                key={key}
                className={level === key ? "active" : ""}
                onClick={() => setLevel(key)}
              >
                {commissionLevels[key].label}
              </button>
            ))}
          </div>

          <div className="commission-box">
            <h3>
              Total Commission {commissionLevels[level].label}:{" "}
              <span className="total">
                {teamData[level].members
                  .reduce(
                    (sum, rec) =>
                      sum +
                      rec.payments.totalDeposit * commissionLevels[level].rate,
                    0
                  )
                  .toFixed(2)}{" "}
                PKR
              </span>
            </h3>

            {teamData[level].members.map((rec, i) => (
              <div key={i} className="commission-card">
                <p>
                  <span className="blue">User Id:</span> {rec._id}
                </p>
                <p>
                  <span>Full Name:</span> {rec.fullName}
                </p>
                <p>
                  <span>Email:</span> {rec.email}
                </p>
                <p>
                  <span className="orange">Deposit Amount:</span>{" "}
                  {rec.payments.totalDeposit} PKR
                </p>
                <p>
                  <span className="green">Commission Earned:</span>{" "}
                  {(
                    rec.payments.totalDeposit * commissionLevels[level].rate
                  ).toFixed(2)}{" "}
                  PKR
                </p>
                <p>
                  <span className="green">Joined:</span>{" "}
                  {new Date(rec.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Deposit/Withdraw History */}
      {type !== "commission" && (
        <>
          {transactionList.length === 0 ? (
            <p>No transactions available.</p>
          ) : (
            transactionList.map((item, index) => (
              <div key={index} className="transaction-card">
                <h3>
                  {type === "withdraw" ? "Withdraw With" : "Deposit With"}{" "}
                  {item.payment_method}
                </h3>
                <p>
                  <span>Amount:</span>{" "}
                  {item.depositsAmount || item.withdrawalsAmount} PKR
                </p>
                {item.depositStatus && (
                  <p>
                    <span>Status:</span> {item.depositStatus}
                  </p>
                )}
                {item.withdrawalStatus && (
                  <p>
                    <span>Status:</span> {item.withdrawalStatus}
                  </p>
                )}
                <p>
                  <span>Date:</span> {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}
