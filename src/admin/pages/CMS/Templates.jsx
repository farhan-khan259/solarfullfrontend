// src/admin/pages/CMS/Templates.jsx
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/admin.css";
import "../../styles/userlist.css";

export default function Templates() {
  const [deposit, setDeposit] = useState("Your deposit approved.");
  const [withdrawal, setWithdrawal] = useState("Your withdrawal approved.");

  const handleSave = () => {
    alert("Saved (stub)"); // Replace with backend save logic
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2>Email / SMS Templates</h2>
          <div className="card-box">
            <label>Deposit Approved</label>
            <textarea
              style={{ width: "100%" }}
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
            />
            <label>Withdrawal Approved</label>
            <textarea
              style={{ width: "100%" }}
              value={withdrawal}
              onChange={(e) => setWithdrawal(e.target.value)}
            />
            <div style={{ marginTop: 12 }}>
              <button className="action-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
