// import { useState } from "react";
// import { FaArrowLeft } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import "./Transactionhistory.css";

// export default function Transactionhistory() {
//   const [type, setType] = useState("deposit"); // deposit | withdraw | commission
//   const [status, setStatus] = useState("pending"); // for deposit/withdraw
//   const [level, setLevel] = useState("level1"); // for commission levels

//   // Commission mock data
//   const commissionData = {
//     level1: {
//       total: "5965 PKR",
//       records: [
//         {
//           userId: "1001",
//           upliner: "M Farhan",
//           deposit: "5000 PKR",
//           commission: "800 PKR",
//           date: "10/08/2025 (10:54 PM)",
//         },
//         {
//           userId: "1002",
//           upliner: "Ali Raza",
//           deposit: "3000 PKR",
//           commission: "500 PKR",
//           date: "09/08/2025 (03:20 PM)",
//         },
//         {
//           userId: "1003",
//           upliner: "Hassan Khan",
//           deposit: "7000 PKR",
//           commission: "1100 PKR",
//           date: "08/08/2025 (01:10 PM)",
//         },
//       ],
//     },
//     level2: {
//       total: "2560 PKR",
//       records: [
//         {
//           userId: "2001",
//           upliner: "Sajid Ali",
//           deposit: "4000 PKR",
//           commission: "600 PKR",
//           date: "07/08/2025 (05:30 PM)",
//         },
//         {
//           userId: "2002",
//           upliner: "Bilal Ahmed",
//           deposit: "2500 PKR",
//           commission: "400 PKR",
//           date: "06/08/2025 (11:15 AM)",
//         },
//         {
//           userId: "2003",
//           upliner: "Umair Qureshi",
//           deposit: "3500 PKR",
//           commission: "550 PKR",
//           date: "05/08/2025 (07:45 PM)",
//         },
//       ],
//     },
//     level3: {
//       total: "1420 PKR",
//       records: [
//         {
//           userId: "3001",
//           upliner: "Kamran Iqbal",
//           deposit: "2000 PKR",
//           commission: "300 PKR",
//           date: "04/08/2025 (09:30 PM)",
//         },
//         {
//           userId: "3002",
//           upliner: "Ahmed Hassan",
//           deposit: "1800 PKR",
//           commission: "280 PKR",
//           date: "03/08/2025 (01:50 PM)",
//         },
//         {
//           userId: "3003",
//           upliner: "Sana Khan",
//           deposit: "2500 PKR",
//           commission: "400 PKR",
//           date: "02/08/2025 (10:25 AM)",
//         },
//       ],
//     },
//   };

//   // Deposit/Withdraw mock data (your existing code)
//   const data = {
//     withdraw: {
//       pending: [
//         {
//           method: "Easypaisa",
//           amount: "1500 PKR",
//           charge: "50 PKR",
//           afterCharge: "1450 PKR",
//           number: "03451234567",
//           account: "Farhan Khan",
//           status: "Pending",
//           date: "11/09/2025 (12:30 PM)",
//         },
//         {
//           method: "JazzCash",
//           amount: "3000 PKR",
//           charge: "100 PKR",
//           afterCharge: "2900 PKR",
//           number: "03011234567",
//           account: "Ali Raza",
//           status: "Pending",
//           date: "10/09/2025 (06:20 PM)",
//         },
//         {
//           method: "Bank Transfer",
//           amount: "5000 PKR",
//           charge: "150 PKR",
//           afterCharge: "4850 PKR",
//           number: "PK88XYZ123456789",
//           account: "Ahmed Iqbal",
//           status: "Pending",
//           date: "09/09/2025 (09:50 AM)",
//         },
//       ],
//       complete: [
//         {
//           method: "Easypaisa",
//           amount: "5000 PKR",
//           charge: "100 PKR",
//           afterCharge: "4900 PKR",
//           number: "03459876543",
//           account: "Hassan Khan",
//           status: "Complete",
//           date: "08/09/2025 (11:00 AM)",
//         },
//         {
//           method: "Bank Transfer",
//           amount: "10,000 PKR",
//           charge: "200 PKR",
//           afterCharge: "9,800 PKR",
//           number: "PK00ABC123456789",
//           account: "Sajid Ali",
//           status: "Complete",
//           date: "06/09/2025 (03:15 PM)",
//         },
//         {
//           method: "JazzCash",
//           amount: "2500 PKR",
//           charge: "50 PKR",
//           afterCharge: "2450 PKR",
//           number: "03014567890",
//           account: "Usman Ahmed",
//           status: "Complete",
//           date: "04/09/2025 (05:40 PM)",
//         },
//       ],
//       rejected: [
//         {
//           method: "JazzCash",
//           amount: "2500 PKR",
//           charge: "80 PKR",
//           afterCharge: "2420 PKR",
//           number: "03019876543",
//           account: "Ahmed Khan",
//           status: "Rejected",
//           date: "05/09/2025 (07:40 PM)",
//         },
//         {
//           method: "Bank Transfer",
//           amount: "7000 PKR",
//           charge: "200 PKR",
//           afterCharge: "6800 PKR",
//           number: "PK66LMN789654321",
//           account: "Bilal Qureshi",
//           status: "Rejected",
//           date: "03/09/2025 (02:20 PM)",
//         },
//         {
//           method: "Easypaisa",
//           amount: "1800 PKR",
//           charge: "60 PKR",
//           afterCharge: "1740 PKR",
//           number: "03451112222",
//           account: "Ayesha Khan",
//           status: "Rejected",
//           date: "02/09/2025 (09:15 AM)",
//         },
//       ],
//     },

//     deposit: {
//       pending: [
//         {
//           method: "Bank Transfer",
//           amount: "6000 PKR",
//           charge: "120 PKR",
//           afterCharge: "5880 PKR",
//           number: "PK12XYZ987654321",
//           account: "Usman Iqbal",
//           status: "Pending",
//           date: "11/09/2025 (10:20 AM)",
//         },
//         {
//           method: "JazzCash",
//           amount: "1500 PKR",
//           charge: "50 PKR",
//           afterCharge: "1450 PKR",
//           number: "03019998888",
//           account: "Hamza Ali",
//           status: "Pending",
//           date: "10/09/2025 (03:45 PM)",
//         },
//         {
//           method: "Easypaisa",
//           amount: "2200 PKR",
//           charge: "70 PKR",
//           afterCharge: "2130 PKR",
//           number: "03456667777",
//           account: "Fatima Noor",
//           status: "Pending",
//           date: "09/09/2025 (07:30 PM)",
//         },
//       ],
//       complete: [
//         {
//           method: "Easypaisa",
//           amount: "2000 PKR",
//           charge: "50 PKR",
//           afterCharge: "1950 PKR",
//           number: "03450000001",
//           account: "Bilal Ahmed",
//           status: "Complete",
//           date: "09/09/2025 (04:45 PM)",
//         },
//         {
//           method: "JazzCash",
//           amount: "4000 PKR",
//           charge: "100 PKR",
//           afterCharge: "3900 PKR",
//           number: "03010000002",
//           account: "Ayesha Khan",
//           status: "Complete",
//           date: "07/09/2025 (01:25 PM)",
//         },
//         {
//           method: "Bank Transfer",
//           amount: "12,000 PKR",
//           charge: "250 PKR",
//           afterCharge: "11,750 PKR",
//           number: "PK55LMN123123123",
//           account: "Hamza Ali",
//           status: "Complete",
//           date: "04/09/2025 (09:10 AM)",
//         },
//       ],
//       rejected: [
//         {
//           method: "Easypaisa",
//           amount: "3500 PKR",
//           charge: "90 PKR",
//           afterCharge: "3410 PKR",
//           number: "03458888888",
//           account: "Sana Malik",
//           status: "Rejected",
//           date: "03/09/2025 (02:00 PM)",
//         },
//         {
//           method: "Bank Transfer",
//           amount: "8000 PKR",
//           charge: "180 PKR",
//           afterCharge: "7820 PKR",
//           number: "PK77QWE456789123",
//           account: "Tariq Mahmood",
//           status: "Rejected",
//           date: "01/09/2025 (05:15 PM)",
//         },
//         {
//           method: "JazzCash",
//           amount: "1200 PKR",
//           charge: "40 PKR",
//           afterCharge: "1160 PKR",
//           number: "03017776666",
//           account: "Imran Khan",
//           status: "Rejected",
//           date: "31/08/2025 (11:00 AM)",
//         },
//       ],
//     },
//   };

//   const transactionList =
//     type === "commission"
//       ? []
//       : data[type] && data[type][status]
//       ? data[type][status]
//       : [];

//   return (
//     <div className="transaction-container">
//       <div className="transaction-header">
//         <Link to="/setting" className="back-linkth">
//           <FaArrowLeft />
//         </Link>
//         <h2 className="transaction-title">Transaction History</h2>
//       </div>

//       {/* Top Tabs */}
//       <div className="type-tabs">
//         <button
//           className={type === "deposit" ? "active" : ""}
//           onClick={() => setType("deposit")}
//         >
//           Deposit History
//         </button>
//         <button
//           className={type === "withdraw" ? "active" : ""}
//           onClick={() => setType("withdraw")}
//         >
//           Withdraw History
//         </button>
//         <button
//           className={type === "commission" ? "active" : ""}
//           onClick={() => setType("commission")}
//         >
//           Commission History
//         </button>
//       </div>

//       {/* Status Tabs for deposit/withdraw */}
//       {type !== "commission" && (
//         <div className="status-tabs">
//           <button
//             className={status === "pending" ? "active" : ""}
//             onClick={() => setStatus("pending")}
//           >
//             PENDING
//           </button>
//           <button
//             className={status === "complete" ? "active" : ""}
//             onClick={() => setStatus("complete")}
//           >
//             COMPLETE
//           </button>
//           <button
//             className={status === "rejected" ? "active" : ""}
//             onClick={() => setStatus("rejected")}
//           >
//             REJECTED
//           </button>
//         </div>
//       )}

//       {/* Commission History Screen */}
//       {type === "commission" && (
//         <div className="commission-section">
//           <div className="level-tabs">
//             <button
//               className={level === "level1" ? "active" : ""}
//               onClick={() => setLevel("level1")}
//             >
//               Level 1
//             </button>
//             <button
//               className={level === "level2" ? "active" : ""}
//               onClick={() => setLevel("level2")}
//             >
//               Level 2
//             </button>
//             <button
//               className={level === "level3" ? "active" : ""}
//               onClick={() => setLevel("level3")}
//             >
//               Level 3
//             </button>
//           </div>

//           <div className="commission-box">
//             <h3>
//               Total Commission {level.toUpperCase()}:{" "}
//               <span className="total">{commissionData[level].total}</span>
//             </h3>

//             {commissionData[level].records.map((rec, i) => (
//               <div key={i} className="commission-card">
//                 <p>
//                   <span className="blue">User Id:</span> {rec.userId}
//                 </p>
//                 <p>
//                   <span>Up liner By:</span> {rec.upliner}
//                 </p>
//                 <p>
//                   <span className="orange">Deposit Amount:</span> {rec.deposit}
//                 </p>
//                 <p>
//                   <span className="pink">Commission:</span> {rec.commission}
//                 </p>
//                 <p>
//                   <span className="green">Date and time:</span> {rec.date}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Deposit/Withdraw Screen */}
//       {type !== "commission" && (
//         <>
//           {transactionList.length === 0 ? (
//             <p>No transactions available.</p>
//           ) : (
//             transactionList.map((item, index) => (
//               <div key={index} className="transaction-card">
//                 <h3>
//                   {type === "withdraw" ? "Withdraw With" : "Deposit With"}{" "}
//                   {item.method}
//                 </h3>
//                 <p>
//                   <span>Method:</span> {item.method}
//                 </p>
//                 <p>
//                   <span>Amount:</span> {item.amount}
//                 </p>
//                 <p>
//                   <span>Charge:</span> {item.charge}
//                 </p>
//                 <p>
//                   <span>After Charge:</span> {item.afterCharge}
//                 </p>
//                 <p>
//                   <span>{item.method} Number:</span>{" "}
//                   <strong className="highlight">{item.number}</strong>
//                 </p>
//                 <p>
//                   <span>Account Title:</span>{" "}
//                   <strong className="highlight">{item.account}</strong>
//                 </p>
//                 <p>
//                   <span>Status:</span> {item.status}
//                 </p>
//                 <p>
//                   <span>Date:</span> {item.date}
//                 </p>
//               </div>
//             ))
//           )}
//         </>
//       )}
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Transactionhistory.css";

export default function Transactionhistory() {
	const [type, setType] = useState("deposit"); // deposit | withdraw | commission
	const [status, setStatus] = useState("pending"); // deposit/withdraw
	const [level, setLevel] = useState("directReferrals"); // commission: direct | indirect | extended
	const [loading, setLoading] = useState(true);
	const [teamData, setTeamData] = useState(null);
	const userString = localStorage.getItem("user");
	const user = JSON.parse(userString);
	const userId = user?._id;

	// ✅ Fetch API
	useEffect(() => {
		const fetchTeamData = async () => {
			try {
				const res = await axios.post("http://localhost:3005/team", {
					userId: userId, // dynamic: replace with logged-in user
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

	if (!userId) {
		return <div>Plz Login User </div>;
	}
	if (loading) return <p>Loading...</p>;
	if (!teamData) return <p>No data available.</p>;
	// ✅ Commission section (direct / indirect / extended)
	const commissionLevels = {
		directReferrals: "Level 1",
		indirectReferrals: "Level 2",
		extendedReferrals: "Level 3",
	};

	// ✅ Payments (deposit / withdraw)
	const payments = teamData?.payment || [];
	console.log(teamData.payment);
	const depositPayments = payments.filter((p) => p.depositsAmount);
	const withdrawPayments = payments.filter((p) => p.withdrawalsAmount);
	console.log(depositPayments);
	console.log(withdrawPayments);

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
					onClick={() => setType("deposit")}>
					Deposit History
				</button>
				<button
					className={type === "withdraw" ? "active" : ""}
					onClick={() => setType("withdraw")}>
					Withdraw History
				</button>
				<button
					className={type === "commission" ? "active" : ""}
					onClick={() => setType("commission")}>
					Commission History
				</button>
			</div>

			{/* Status Tabs for deposit/withdraw */}
			{type !== "commission" && (
				<div className="status-tabs">
					<button
						className={status === "pending" ? "active" : ""}
						onClick={() => setStatus("pending")}>
						PENDING
					</button>
					<button
						className={status === "complete" ? "active" : ""}
						onClick={() => setStatus("complete")}>
						COMPLETE
					</button>
					<button
						className={status === "rejected" ? "active" : ""}
						onClick={() => setStatus("rejected")}>
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
								onClick={() => setLevel(key)}>
								{commissionLevels[key]}
							</button>
						))}
					</div>

					<div className="commission-box">
						<h3>
							Total Commission {commissionLevels[level]}:{" "}
							<span className="total">
								{teamData[level].totalCommission} PKR
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
									<span className="pink">Withdrawal:</span>{" "}
									{rec.payments.totalWithdrawal} PKR
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
