import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaLock,
  FaRegClock,
  FaWallet,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./Withdrawfunds.css";

const Withdrawfunds = () => {
  const location = useLocation();
  const { bankName, accountNumber, accountName } = location.state || {};

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userBalance, setUserBalance] = useState(0);

  // ✅ Get user
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?._id;

  const [plans, setPlans] = useState([]);

  // ✅ Fetch fresh user balance from DB
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await axios.post("https://be.solarx0.com/team", { userId });
        if (res.data?.user?.userbalance !== undefined) {
          setUserBalance(res.data.user.userbalance);
        }
      } catch (err) {
        console.error("Error fetching user balance:", err);
      }
    };
    if (userId) fetchBalance();
  }, [userId]);

  useEffect(() => {
    // Fetch plans from backend
    const fetchPlan = async () => {
      try {
        const res = await axios.get(`https://be.solarx0.com/api/plans/`, {
          params: { id: userId },
        });
        if (res.data.success) {
          setPlans(res.data.plans);
        }
      } catch (err) {
        console.error("Error fetching plan:", err);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchPlan();
  }, [userId]);

  const handleSubmit = async () => {
    if (!amount || Number(amount) < 100) {
      setErrorMessage("Minimum withdrawal amount is 100 PKR");
      setShowError(true);
      return;
    }

    if (plans.length === 0) {
      setErrorMessage("You need at least 1 active plan to withdraw");
      setShowError(true);
      return;
    }

    if (Number(amount) > userBalance) {
      setErrorMessage("Insufficient balance for this withdrawal");
      setShowError(true);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("https://be.solarx0.com/api/withdrawal", {
        userId: userId,
        withdrawals: Number(amount),
        bankName,
        accountNumber,
        accountName,
      });

      if (res.data.success) {
        // ✅ Update UI balance instantly
        setUserBalance((prev) => prev - Number(amount));

        setShowSuccess(true);
        setAmount("");
      } else {
        setErrorMessage(res.data.message || "Withdrawal failed");
        setShowError(true);
      }
    } catch (err) {
      console.error("Withdrawal error:", err);
      setErrorMessage("Server error. Please try again later.");
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="withdraw-container3">
      <div className="withdraw-header3">
        <Link to="/withdraw">
          <FaArrowLeft className="back-icon3" />
        </Link>
        <h2 className="title3">Withdraw Funds</h2>
      </div>

      {/* ✅ Show exact DB balance */}
      <div className="balance-card3">
        <span>Available Balance</span>
        <h1 className="balance-amount3">{userBalance.toFixed(2)} PKR</h1>
      </div>

      <div className="card3">
        <h3 className="step-title3">
          <FaWallet className="step-icon3" /> Step 1: Withdrawal Account Status
        </h3>
        <div className="success-status3">
          <FaCheckCircle className="success-icon3" />
          <span>Account Bound Successfully</span>
        </div>

        <div className="account-info3">
          <p>
            <strong>{bankName}</strong>
          </p>
          <p>Account Name: {accountName}</p>
          <p>Account Number: {accountNumber}</p>
          <small className="note3">
            <FaLock className="lock-icon3" /> Account details are secured and
            can only be changed by Admin.
          </small>
        </div>
      </div>

      {/* 24/7 Withdrawal Service */}
      <div className="card3 green-card3">
        <h3 className="step-title3">
          <FaRegClock className="step-icon3" />
          Withdrawal Service 10:00 AM – 8:00 PM
        </h3>
        <p className="available-btn3">Withdrawals Available Anytime</p>
        <p className="service-note3">
          Your withdrawal will be credited to your account within 6-12 hours.
        </p>
      </div>

      {/* Step 2 */}
      <div className="card3">
        <h3 className="step-title3">
          <FaWallet className="step-icon3" /> Step 2: Enter Withdrawal Amount
        </h3>

        <input
          className="amount-input3"
          type="number"
          placeholder="Enter amount (Min 100)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="100"
        />

        <button
          className="submit-btn3"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit Withdrawal Request"}
        </button>
      </div>

      {/* Success Popup */}
      {showSuccess && (
        <div className="deposit-success-overlay">
          <div className="deposit-success-box">
            <h2>✅ Withdraw Request Submitted</h2>
            <p>Your withdrawal request has been submitted successfully.</p>
            <button onClick={() => setShowSuccess(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showError && (
        <div className="deposit-success-overlay">
          <div className="deposit-success-box">
            <h2>❌ Withdrawal Failed</h2>
            <p>{errorMessage}</p>
            <button onClick={() => setShowError(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Withdrawfunds;
