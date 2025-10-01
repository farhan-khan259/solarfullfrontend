import axios from "axios";
import { useState } from "react";
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
  const { bankName, accountNumber, accountName, totalMoneyAccount } =
    location.state || {};
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?._id;
  console.log("location", location.state);
  const userPlan = localStorage.getItem("userPlan");
  console.log(userPlan);

  const handleSubmit = async () => {
    if (!amount || Number(amount) < 100) {
      setErrorMessage("Minimum withdrawal amount is 100 PKR");
      setShowError(true);
      return;
    }
    if (Number(userPlan) === 0) {
      setErrorMessage("Minimum plan  one active ");
      setShowError(true);
      return;
    }

    if (Number(amount) > totalMoneyAccount) {
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

      <div className="balance-card3">
        <span>Available Balance</span>
        <h1 className="balance-amount3">{totalMoneyAccount} PKR</h1>
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

      {/* Restricted - Only show if user hasn't activated a plan */}
      {/* <div className="card3 error-card3">
				<h4 className="error-title3">
					<FaInfoCircle className="error-icon3" /> Withdrawal Restricted
				</h4>
				<p className="error-desc3">
					You cannot withdraw until you activate a plan with your deposited
					funds.
				</p>
				<p className="error-desc3">
					Please activate a plan before submitting a withdrawal request.
				</p>
			</div> */}

      {/* Step 2 */}
      <div className="card3">
        <h3 className="step-title3">
          <FaWallet className="step-icon3" /> Step 2: Enter Withdrawal Amount
        </h3>
        {/* Only show this alert if user hasn't activated a plan */}
        {/* <div className="alert3">
					You must activate a plan before submitting a withdrawal request
				</div> */}
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
