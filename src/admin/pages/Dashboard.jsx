import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ Add this
import Card from "../components/Card";
import Charts from "../components/Charts";
import Topbar from "../components/Topbar";
import "../styles/admin.css";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get(
          "https://be.solarx0.com/api/admin/dashboard-stats"
        );
        if (response.data.success) {
          setStats(response.data.stats);
        } else {
          setError("Failed to fetch dashboard statistics");
        }
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setError("Error loading dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="admin-layout">
        <div className="main-content">
          <Topbar />
          <div className="dashboard-container">
            <div className="loading">Loading dashboard data...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-layout">
        <div className="main-content">
          <Topbar />
          <div className="dashboard-container">
            <div className="error">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="admin-layout">
        <div className="main-content">
          <Topbar />
          <div className="dashboard-container">
            <div className="error">No data available</div>
          </div>
        </div>
      </div>
    );
  }

  const cards = [
    { title: "Today Users Join", value: stats.todayUsers },
    {
      title: "Today Deposit ",
      value: `PKR ${stats.todayDeposits?.toLocaleString()}`,
    },
    {
      title: "Today Withdraw ",
      value: `PKR ${stats.todayWithdrawals?.toLocaleString()}`,
    },
    { title: "Total Users", value: stats.totalUsers },
    {
      title: "Total Deposits ",
      value: `PKR ${stats.totalDeposits?.toLocaleString()}`,
    },
    {
      title: "Total Withdrawals ",
      value: `PKR ${stats.totalWithdrawals?.toLocaleString()}`,
    },
    {
      title: "Pending Deposits",
      value: stats.pendingDeposits,
      link: "/admin/deposits/pending", // ✅ Add link here
    },
    {
      title: "Pending Withdrawals",
      value: stats.pendingWithdrawals,
      link: "/admin/withdrawals/pending", // ✅ Add link here
    },
    { title: "Active Plans", value: stats.activePlans },
  ];

  return (
    <div className="admin-layout">
      <div className="main-content">
        <Topbar />
        <div className="dashboard-container">
          {/* Cards */}
          <div className="dashboard-cards">
            {cards.map((c, i) => {
              // 🎨 Define custom color styles
              let bgColor = "#fff";
              let textColor = "#000";

              if (
                c.title === "Pending Deposits" ||
                c.title === "Pending Withdrawals"
              ) {
                bgColor = "#1e88e5"; // nice blue
                textColor = "#fff"; // white text
              } else if (i < 3) {
                bgColor = "#e53935"; // red for first 3
                textColor = "#fff";
              }

              const cardContent = (
                <Card
                  title={c.title}
                  value={c.value}
                  color={bgColor}
                  textColor={textColor}
                />
              );

              return c.link ? (
                <Link
                  to={c.link}
                  key={i}
                  className="card-link"
                  style={{ textDecoration: "none" }}
                >
                  {cardContent}
                </Link>
              ) : (
                <div key={i}>{cardContent}</div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="charts-section">
            <Charts
              userGrowth={stats.userGrowth}
              monthlyDeposits={stats.monthlyDeposits}
            />
          </div>

          {/* Recent Deposits */}
          <div className="recent-section">
            <h3>Recent Deposits</h3>
            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentDeposits.map((d, index) => (
                    <tr key={d.id}>
                      <td>D{String(index + 1).padStart(3, "0")}</td>
                      <td>{d.user_id}</td>
                      <td>{d.depositsAmount?.toLocaleString()}</td>
                      <td>{d.payment_method}</td>
                      <td
                        className={
                          d.depositStatus === "completed"
                            ? "status-completed"
                            : "status-pending"
                        }
                      >
                        {d.depositStatus}
                      </td>
                      <td>{d.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Withdrawals */}
          <div className="recent-section">
            <h3>Recent Withdrawals</h3>
            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentWithdrawals.map((w, index) => (
                    <tr key={w.id}>
                      <td>W{String(index + 1).padStart(3, "0")}</td>
                      <td>{w.user_id}</td>
                      <td>{w.withdrawalsAmount?.toLocaleString()}</td>
                      <td
                        className={
                          w.withdrawalStatus === "completed"
                            ? "status-completed"
                            : "status-pending"
                        }
                      >
                        {w.withdrawalStatus}
                      </td>
                      <td>{w.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
