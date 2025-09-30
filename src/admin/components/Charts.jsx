import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	CartesianGrid,
	ResponsiveContainer,
	BarChart,
	Bar,
} from "recharts";

const months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

// Normalize user growth
function buildUserData(apiData) {
	return months.map((month, idx) => {
		const found = apiData.find((d) => d._id === idx + 1 || d.month === month);
		return { month, users: found ? found.count : 0 };
	});
}

// Normalize deposits
function buildDepositData(apiData) {
	return months.map((month, idx) => {
		const found = apiData.find((d) => d._id === idx + 1 || d.month === month);
		return { month, amount: found ? found.total : 0 };
	});
}

export default function Charts({ userGrowth = [], monthlyDeposits = [] }) {
	const userData = buildUserData(userGrowth);
	const depositData = buildDepositData(monthlyDeposits);

	console.log("User Growth Chart Data:", userData);
	console.log("Monthly Deposits Chart Data:", depositData);

	return (
		<div className="charts-wrapper">
			{/* User Growth */}
			<div className="chart-box">
				<h3>User Growth</h3>
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={userData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="month" />
						<YAxis />
						<Tooltip />
						<Line
							type="monotone"
							dataKey="users"
							stroke="#2196f3"
							strokeWidth={2}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>

			{/* Monthly Deposits */}
			<div className="chart-box">
				<h3>Monthly Deposits</h3>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={depositData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="month" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="amount" fill="#4caf50" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
