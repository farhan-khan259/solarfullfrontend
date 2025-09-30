import { useState, useEffect } from "react";
import { FaArrowLeft, FaLock, FaWallet, FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Withdraw.css";

const Withdraw = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [hasBoundAccount, setHasBoundAccount] = useState(false);
	const [accountDetails, setAccountDetails] = useState(null);
	const navigate = useNavigate();

	// Get user ID from localStorage
	const userString = localStorage.getItem("user");
	const user = userString ? JSON.parse(userString) : null;
	const userId = user?._id;
	const [teamData, setTeamData] = useState(null);

	console.log(teamData?.user?.amount);
	useEffect(() => {
		const fetchTeamData = async () => {
			try {
				const res = await axios.post("http://localhost:3005/team", { userId });
				setTeamData(res.data);
			} catch (err) {
				console.error("Error fetching team data:", err);
			}
		};

		fetchTeamData();
	}, [userId]);
	useEffect(() => {
		const checkBindAccount = async () => {
			try {
				if (!userId) {
					setError("User not logged in");
					setLoading(false);
					return;
				}

				const res = await axios.post(
					"http://localhost:3005/api/bindAccountRoutes/find",
					{ userId }
				);

				if (res.data.success && res.data.data && res.data.data.length > 0) {
					// Get the first bound account
					console.log("total mONey In backaccount", res.data.totalMoneyAccount);
					const account = res.data.data;
					console.log(account);
					setHasBoundAccount(true);
					setAccountDetails({
						userId: userId,
						bankName: res.data.data[0].bankName,
						accountName: res.data.data[0].Accountholder,
						accountNumber: res.data.data[0].AccountNumber,
						totalMoneyAccount: res.data.totalMoneyAccount,
					});
					console.log("data", res.data.data[0]._id);

					
				}
			} catch (err) {
				console.log("No bind account found, user must bind first.");
			} finally {
				setLoading(false);
			}
		};

		checkBindAccount();
	}, [userId, teamData?.user?.amount]);

	console.log("account : ", accountDetails);
	const handleNavigateToWithdraw = () => {
		if (hasBoundAccount && accountDetails) {
			navigate("/withdrawfunds", { state: accountDetails });
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

			<div className="balance-card-withdraw">
				<div>
					<span className="balance-label">Available Balance</span>
					<div className="balance-amount">
						{accountDetails?.totalMoneyAccount} PKR
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
