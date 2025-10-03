import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaCheckCircle, FaLock, FaWallet } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Withdraw.css";

const Withdraw = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasBoundAccount, setHasBoundAccount] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null);
  const [userBalance, setUserBalance] = useState(0);

  const navigate = useNavigate();

  // ✅ Get user ID from localStorage
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?._id;

  // ✅ Fetch fresh user balance + check bind account
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        // 🔹 Fetch user/team data
        const teamRes = await axios.post("https://be.solarx0.com/team", {
          userId,
        });
        if (teamRes.data?.user?.userbalance !== undefined) {
          setUserBalance(teamRes.data.user.userbalance); // ✅ exact DB balance
        }

        // 🔹 Fetch bind account
        const accountRes = await axios.post(
          "https://be.solarx0.com/api/bindAccountRoutes/find",
          { userId }
        );

        if (accountRes.data.success && accountRes.data.data.length > 0) {
          const account = accountRes.data.data[0];
          setHasBoundAccount(true);
          setAccountDetails({
            userId,
            bankName: account.bankName,
            accountName: account.Accountholder,
            accountNumber: account.AccountNumber,
          });
        }
      } catch (err) {
        console.error("Error fetching withdraw data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleNavigateToWithdraw = () => {
    if (hasBoundAccount && accountDetails) {
      navigate("/withdrawfunds", {
        state: {
          ...accountDetails,
          totalMoneyAccount: userBalance, // ✅ send actual DB balance
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="withdraw-container">
        <div className="loading">Checking your account status...</div>
      </div>
    );
  }

  return (
    <div className="withdraw-container">
      <div className="headerwd">
        <Link className="back-linkwd" to="/dashboard">
          <FaArrowLeft />
        </Link>
        <span>Withdraw Funds</span>
      </div>

      {/* ✅ Show balance straight from DB */}
      <div className="balance-card-withdraw">
        <div>
          <span className="balance-label">Available Balance</span>
          <div className="balance-amount">
            {userBalance.toLocaleString()} PKR
          </div>
        </div>
      </div>

      <div className="step-card">
        <div className="step-title">Step 1: Withdrawal Account Status</div>

        {hasBoundAccount ? (
          <div className="status">
            <FaCheckCircle className="status-icon" style={{ color: "green" }} />
            <div className="status-text">Account Bound Successfully</div>
            <div className="account-info"></div>
            <button className="bind-btn" onClick={handleNavigateToWithdraw}>
              <FaWallet className="btn-icon" /> Proceed to Withdraw
            </button>
          </div>
        ) : (
          <div className="status">
            <FaLock className="status-icon" />
            <div className="status-text">Account Not Bound</div>
            <div className="status-subtext">
              You must bind your withdrawal account before applying for a
              withdrawal.
            </div>
            <button className="bind-btn">
              <Link to="/withdrawform">
                <FaWallet className="btn-icon" /> Bind Account Now
              </Link>
            </button>
          </div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Withdraw;
