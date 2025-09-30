// src/admin/pages/Admin/AdminLogs.jsx
import { useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/admin.css";

// Generate random timestamps in the past 48 hours
function getRandomPastDate() {
  const now = new Date();
  const pastTime =
    now.getTime() - Math.floor(Math.random() * 48 * 60 * 60 * 1000);
  return new Date(pastTime);
}

export default function AdminLogs() {
  const [search, setSearch] = useState("");

  // Memoize logs so they don't regenerate every render
  const logs = useMemo(
    () => [
      {
        admin: "Farhan",
        action: "approveDeposit",
        details: "Approved deposit of PKR 3000 for user Anas",
        timestamp: getRandomPastDate(),
      },
      {
        admin: "Sajjid",
        action: "saveSettings",
        details: "Updated commission rate to 5%",
        timestamp: getRandomPastDate(),
      },
      {
        admin: "Farhan",
        action: "approveWithdrawal",
        details: "Approved withdrawal request of PKR 2000 for user Hashir",
        timestamp: getRandomPastDate(),
      },
      {
        admin: "Sajjid",
        action: "saveSettings",
        details: "Changed minimum deposit to PKR 500",
        timestamp: getRandomPastDate(),
      },
      {
        admin: "Farhan",
        action: "approveDeposit",
        details: "Approved deposit of PKR 5000 for user Ahmed",
        timestamp: getRandomPastDate(),
      },
      {
        admin: "Sajjid",
        action: "saveSettings",
        details: "Enabled two-factor authentication",
        timestamp: getRandomPastDate(),
      },
    ],
    [] // only create once
  );

  // Filter logs based on search input
  const filteredLogs = useMemo(() => {
    const q = search.toLowerCase();
    return logs.filter((log) => {
      const admin = log.admin.toLowerCase();
      const action = log.action.toLowerCase();
      const details = log.details.toLowerCase();
      return admin.includes(q) || action.includes(q) || details.includes(q);
    });
  }, [logs, search]);

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2>Admin Logs</h2>

          {/* Search input */}
          <div style={{ marginBottom: 12 }}>
            <input
              type="text"
              placeholder="Search logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                fontSize: 14,
                border: "1px solid #ccc",
                borderRadius: 4,
              }}
            />
          </div>

          {/* Log list */}
          <div
            className="card-box"
            style={{ padding: 12, maxHeight: 400, overflowY: "auto" }}
          >
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log, index) => (
                <div
                  key={index}
                  style={{
                    borderBottom: "1px solid #eee",
                    padding: "8px 0",
                  }}
                >
                  <div>
                    <strong>Admin:</strong> {log.admin}
                  </div>
                  <div>
                    <strong>Action:</strong> {log.action}
                  </div>
                  <div>
                    <strong>Details:</strong> {log.details}
                  </div>
                  <div style={{ fontSize: 12, color: "#666" }}>
                    {log.timestamp.toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: "#999", fontStyle: "italic" }}>
                No logs found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
