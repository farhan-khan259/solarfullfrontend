// import { useEffect, useState } from "react";
// import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";
// import "./App.css";

// import Loader from "./Components/Loader/Loader";

// // ---- USER PANEL COMPONENTS ----
// import Activeplans from "./Components/Activeplans/Activeplans";
// import Dashboard from "./Components/Dashboard/Dashboard";
// import Deposit from "./Components/Deposit/Deposit";
// import Forgetpassword from "./Components/Forgetpassword/Forgetpassword";
// import Investmentplans from "./Components/Investmentplans/Investmentplans";
// import Profile from "./Components/Profile/Profile";
// import Profilecard from "./Components/Profilecard/Profilecard";
// import Promocodepage from "./Components/Promocodepage/Promocodepage";
// import Rankingdashboard from "./Components/Rankingdashboard/Rankingdashboard";
// import Settings from "./Components/Settings/Settings";
// import Signin from "./Components/Signin/Signin";
// import Signup from "./Components/Signup/Signup";
// import Support from "./Components/Support/Support";
// import Team from "./Components/Team/Team";
// import Transactionhistory from "./Components/Transactionhistory/Transactionhistory";
// import Withdraw from "./Components/Withdraw/Withdraw";
// import Withdrawform from "./Components/Withdrawform/Withdrawform";
// import Withdrawfunds from "./Components/Withdrawfunds/Withdrawfunds";

// // ---- ADMIN PANEL COMPONENTS ----
// import adminRoutes from "./admin/adminRoutes";
// import OurInfo from "./Components/OurInfo/OurInfo";

// function AppRoutes() {
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     const timeout = setTimeout(() => setLoading(false), 500);
//     return () => clearTimeout(timeout);
//   }, [location.pathname]);

//   if (loading) return <Loader />;

//   return (
//     <Routes>
//       {/* -------- USER PANEL -------- */}
//       <Route path="/" element={<Signin />} />
//       <Route path="/signup" element={<Signup />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//       <Route path="/deposit" element={<Deposit />} />
//       <Route path="/withdraw" element={<Withdraw />} />
//       <Route path="/withdrawform" element={<Withdrawform />} />
//       <Route path="/withdrawfunds" element={<Withdrawfunds />} />
//       <Route path="/forgetpassword" element={<Forgetpassword />} />
//       <Route path="/team" element={<Team />} />
//       <Route path="/plans" element={<Investmentplans />} />
//       <Route path="/activeplans" element={<Activeplans />} />
//       <Route path="/profilecard" element={<Profilecard />} />
//       <Route path="/setting" element={<Settings />} />
//       <Route path="/promocode" element={<Promocodepage />} />
//       <Route path="/support" element={<Support />} />
//       <Route path="/profile" element={<Profile />} />
//       <Route path="/rankingdashboard" element={<Rankingdashboard />} />
//       <Route path="/transactionhistory" element={<Transactionhistory />} />
//       <Route path="/ourinfo" element={<OurInfo />} />

//       {/* -------- ADMIN PANEL -------- */}
//       <Route path="/admin" element={<adminRoutes.Dashboard />} />
//       <Route path="/admin/users" element={<adminRoutes.UserList />} />
//       <Route path="/admin/deposits/pending" element={<adminRoutes.PendingDeposits />} />
//       <Route path="/admin/deposits/completed" element={<adminRoutes.CompletedDeposits />} />
//       <Route path="/admin/withdrawals/pending" element={<adminRoutes.PendingWithdrawals />} />
//       <Route path="/admin/withdrawals/completed" element={<adminRoutes.CompletedWithdrawals />} />
//       <Route path="/admin/withdrawals/settings" element={<adminRoutes.WithdrawalSettings />} />
//       <Route path="/admin/plans" element={<adminRoutes.PlansList />} />
//       <Route path="/admin/plans/add" element={<adminRoutes.AddPlan />} />
//       <Route path="/admin/transactions" element={<adminRoutes.AllTransactions />} />
//       <Route path="/admin/transactions/deposits" element={<adminRoutes.DepositHistory />} />
//       <Route path="/admin/transactions/withdrawals" element={<adminRoutes.WithdrawalHistory />} />
//       <Route path="/admin/referrals/tree" element={<adminRoutes.ReferralTree />} />
//       <Route path="/admin/referrals/settings" element={<adminRoutes.ReferralSettings />} />
//       <Route path="/admin/reports/daily" element={<adminRoutes.DailyReport />} />
//       <Route path="/admin/reports/monthly" element={<adminRoutes.MonthlyReport />} />
//       <Route path="/admin/support/tickets" element={<adminRoutes.TicketsList />} />
//       <Route path="/admin/support/tickets/:id" element={<adminRoutes.TicketDetails />} />
//       <Route path="/admin/cms/pages" element={<adminRoutes.Pages />} />
//       <Route path="/admin/cms/announcements" element={<adminRoutes.Announcements />} />
//       <Route path="/admin/cms/templates" element={<adminRoutes.Templates />} />
//       <Route path="/admin/settings/general" element={<adminRoutes.GeneralSettings />} />
//       <Route path="/admin/settings/payment" element={<adminRoutes.PaymentSettings />} />
//       <Route path="/admin/settings/security" element={<adminRoutes.SecuritySettings />} />
//       <Route path="/admin/settings/notifications" element={<adminRoutes.NotificationSettings />} />
//       <Route path="/admin/admins" element={<adminRoutes.AdminList />} />
//       <Route path="/admin/admins/roles" element={<adminRoutes.Roles />} />
//       <Route path="/admin/admins/logs" element={<adminRoutes.AdminLogs />} />
//       <Route path="/admin/userdetails" element={<adminRoutes.UserDetails />} />
//       <Route path="/admin/promocode" element={<adminRoutes.AdminPromoCodes />} />
//     </Routes>
//   );
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <AppRoutes />
//     </BrowserRouter>
//   );
// }

import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./App.css";

import Loader from "./Components/Loader/Loader";
import ProtectedRoute from "./ProtectedRoute";

// ---- USER PANEL COMPONENTS ----
import Activeplans from "./Components/Activeplans/Activeplans";
import Dashboard from "./Components/Dashboard/Dashboard";
import Deposit from "./Components/Deposit/Deposit";
import Forgetpassword from "./Components/Forgetpassword/Forgetpassword";
import Investmentplans from "./Components/Investmentplans/Investmentplans";
import Profile from "./Components/Profile/Profile";
import Profilecard from "./Components/Profilecard/Profilecard";
import Promocodepage from "./Components/Promocodepage/Promocodepage";
import Rankingdashboard from "./Components/Rankingdashboard/Rankingdashboard";
import Settings from "./Components/Settings/Settings";
import Signin from "./Components/Signin/Signin";
import Signup from "./Components/Signup/Signup";
import Support from "./Components/Support/Support";
import Team from "./Components/Team/Team";
import Transactionhistory from "./Components/Transactionhistory/Transactionhistory";
import Withdraw from "./Components/Withdraw/Withdraw";
import Withdrawform from "./Components/Withdrawform/Withdrawform";
import Withdrawfunds from "./Components/Withdrawfunds/Withdrawfunds";

// ---- ADMIN PANEL COMPONENTS ----
import adminRoutes from "./admin/adminRoutes";
import OurInfo from "./Components/OurInfo/OurInfo";

function AppRoutes() {
	const location = useLocation();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const timeout = setTimeout(() => setLoading(false), 500);
		return () => clearTimeout(timeout);
	}, [location.pathname]);

	if (loading) return <Loader />;

	return (
		<Routes>
			{/* -------- PUBLIC ROUTES -------- */}
			<Route path="/" element={<Signin />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/forgetpassword" element={<Forgetpassword />} />
			<Route path="/ourinfo" element={<OurInfo />} />

			{/* -------- USER PROTECTED ROUTES -------- */}
			<Route
				path="/dashboard"
				element={
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/deposit"
				element={
					<ProtectedRoute>
						<Deposit />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/withdraw"
				element={
					<ProtectedRoute>
						<Withdraw />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/withdrawform"
				element={
					<ProtectedRoute>
						<Withdrawform />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/withdrawfunds"
				element={
					<ProtectedRoute>
						<Withdrawfunds />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/team"
				element={
					<ProtectedRoute>
						<Team />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/plans"
				element={
					<ProtectedRoute>
						<Investmentplans />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/activeplans"
				element={
					<ProtectedRoute>
						<Activeplans />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/profilecard"
				element={
					<ProtectedRoute>
						<Profilecard />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/setting"
				element={
					<ProtectedRoute>
						<Settings />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/promocode"
				element={
					<ProtectedRoute>
						<Promocodepage />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/support"
				element={
					<ProtectedRoute>
						<Support />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/profile"
				element={
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/rankingdashboard"
				element={
					<ProtectedRoute>
						<Rankingdashboard />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/transactionhistory"
				element={
					<ProtectedRoute>
						<Transactionhistory />
					</ProtectedRoute>
				}
			/>

			{/* -------- ADMIN PROTECTED ROUTES -------- */}
			<Route
				path="/admin"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.Dashboard />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/users"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.UserList />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/admin/reports/daily"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.DailyReport />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/reports/monthly"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.MonthlyReport />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/cms/announcements"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.Announcements />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/userdetails"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.UserDetails />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/deposits/pending"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.PendingDeposits />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/deposits/completed"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.CompletedDeposits />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/withdrawals/pending"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.PendingWithdrawals />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/withdrawals/completed"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.CompletedWithdrawals />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/plans"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.PlansList />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/promocode"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.AdminPromoCodes />
					</ProtectedRoute>
				}
			/>

			<Route
				path="/admin/referrals/tree"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.ReferralTree />
					</ProtectedRoute>
				}
			/>
			{/* ✅ add the rest of admin routes here, all wrapped with <ProtectedRoute role="admin"> */}
			<Route
				path="/admin/userdetails"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.UserDetails />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/transactions"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.AllTransactions />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/cms/announcements"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.Announcements />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/reports/daily"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.DailyReport />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/reports/monthly"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.MonthlyReport />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/withdrawals/settings"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.WithdrawalSettings />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/referrals/tree"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.ReferralTree />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/referrals/settings"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.ReferralSettings />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/settings/payment"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.PaymentSettings />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/settings/payment"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.PaymentSettings />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/settings/security"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.SecuritySettings />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/settings/notifications"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.NotificationSettings />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/admins"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.AdminList />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/admins/logs"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.AdminLogs />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/admin/admins/roles"
				element={
					<ProtectedRoute role="admin">
						<adminRoutes.Roles />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}

export default function App() {
	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	);
}
