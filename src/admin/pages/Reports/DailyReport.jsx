// src/admin/pages/Reports/daily.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/admin.css";

export default function DailyReport() {
  const [reportData, setReportData] = useState({
    date: "",
    day: "",
    users: [],
    dailyUserscount: 0,
    deposits: 0,
    withdrawals: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDailyReport = async () => {
      try {
        const response = await axios.get(
          "https://be.solarx0.com/api/admin/report/daily"
        );

        if (response.data.success) {
          setReportData(response.data.stats);
        } else {
          setError("Failed to fetch daily report");
        }
      } catch (error) {
        console.error("Error fetching daily report:", error);
        setError("Error fetching daily report data");
      } finally {
        setLoading(false);
      }
    };

    fetchDailyReport();
  }, []);

  if (loading) {
    return (
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-main">
          <Topbar />
          <div className="admin-content">Loading daily report...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-main">
          <Topbar />
          <div className="admin-content" style={{ color: "red" }}>
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2>
            Daily Report - {reportData.date} ({reportData.day})
          </h2>

          {/* Summary Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            <div
              className="card-box"
              style={{ padding: 16, textAlign: "center" }}
            >
              <h3>Total Deposits</h3>
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                PKR {reportData.deposits?.toLocaleString()}
              </p>
            </div>
            <div
              className="card-box"
              style={{ padding: 16, textAlign: "center" }}
            >
              <h3>Total Withdrawals</h3>
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                PKR {reportData.withdrawals?.toLocaleString()}
              </p>
            </div>
            <div
              className="card-box"
              style={{ padding: 16, textAlign: "center" }}
            >
              <h3>New Users Today</h3>
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                {reportData.dailyUserscount?.toLocaleString()}
              </p>
            </div>
            <div
              className="card-box"
              style={{ padding: 16, textAlign: "center" }}
            >
              <h3>Net Profit</h3>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "green",
                }}
              >
                PKR{" "}
                {(
                  reportData.deposits - reportData.withdrawals
                )?.toLocaleString()}
              </p>
            </div>
          </div>

          {/* New Users Table */}
          <div
            className="card-box"
            style={{ padding: 12, marginBottom: "20px" }}
          >
            <h3 style={{ marginBottom: "10px" }}>New Users Registered Today</h3>
            <table className="userlist-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>WhatsApp</th>
                  <th>Referral Code</th>
                  <th>Registration Date</th>
                </tr>
              </thead>
              <tbody>
                {reportData.users.length > 0 ? (
                  reportData.users.map((user, i) => (
                    <tr key={user._id}>
                      <td data-label="ID">{i + 1}</td>
                      <td data-label="Full Name">{user.fullName}</td>
                      <td data-label="Email">{user.email}</td>
                      <td data-label="WhatsApp">{user.whatsappNumber}</td>
                      <td data-label="Referral Code">{user.randomCode}</td>
                      <td data-label="Registration Date">
                        {new Date(user.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      style={{ textAlign: "center", color: "#666" }}
                    >
                      No users registered today
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Note about deposits/withdrawals */}
          <div
            className="card-box"
            style={{ padding: 12, backgroundColor: "#f8f9fa" }}
          >
            <h4>Note:</h4>
            <p>
              The API currently provides summary data for deposits and
              withdrawals. For detailed transaction lists, you might need to
              implement additional endpoints or modify the existing API to
              include transaction details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
