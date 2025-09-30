// src/admin/pages/Transactions/WithdrawalHistory.jsx
import React from "react";
import { useMockStore } from "../../store";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/admin.css";

export default function WithdrawalHistory() {
  const { db } = useMockStore();

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2>Withdrawal History</h2>
          <div className="card-box" style={{ padding: 12 }}>
            <table className="userlist-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>UID</th>
                  <th>Method</th>
                  <th>Account</th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {db.withdrawals.length > 0 ? (
                  db.withdrawals.map((w) => (
                    <tr key={w.id}>
                      <td data-label="ID">{w.id}</td>
                      <td data-label="UID">{w.uid}</td>
                      <td data-label="Method">{w.method}</td>
                      <td data-label="Account">{w.account}</td>
                      <td data-label="Name">{w.name}</td>
                      <td data-label="Amount">
                        PKR {w.amount ? w.amount.toLocaleString() : 0}
                      </td>
                      <td data-label="Date">{w.date}</td>
                      <td data-label="Status">{w.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      style={{ textAlign: "center", color: "#666" }}
                    >
                      No withdrawal records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
