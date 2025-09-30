// src/admin/pages/Transactions/DepositHistory.jsx
import React from "react";
import { useMockStore } from "../../store";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/admin.css";

export default function DepositHistory() {
  const { db } = useMockStore();

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2>Deposit History</h2>
          <div className="card-box" style={{ padding: 12 }}>
            <table className="userlist-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>UID</th>
                  <th>Method</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {db.deposits.length > 0 ? (
                  db.deposits.map((d) => (
                    <tr key={d.id}>
                      <td data-label="ID">{d.id}</td>
                      <td data-label="UID">{d.uid}</td>
                      <td data-label="Method">{d.method}</td>
                      <td data-label="Amount">
                        PKR {d.amount ? d.amount.toLocaleString() : 0}
                      </td>
                      <td data-label="Date">{d.date}</td>
                      <td data-label="Status">{d.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      style={{ textAlign: "center", color: "#666" }}
                    >
                      No deposit records found
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
