// src/admin/pages/Withdrawals/WithdrawalSettings.jsx
import React, { useState } from "react";
import { useMockStore } from "../../store";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/admin.css";
import "../../styles/userlist.css";

export default function WithdrawalSettings() {
  const { db, saveSettings } = useMockStore();
  const [min, setMin] = useState(db.settings?.withdrawal?.min || 500);
  const [max, setMax] = useState(db.settings?.withdrawal?.max || 500000);
  const [fee, setFee] = useState(db.settings?.withdrawal?.fee || 2.0);
  const [saved, setSaved] = useState(false);

  const onSave = () => {
    saveSettings({ withdrawal: { min, max, fee } });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2>Withdrawal Settings</h2>
          <div className="card-box">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 10,
              }}
            >
              <div>
                <label>Min PKR</label>
                <input
                  className="userlist-search"
                  type="number"
                  value={min}
                  onChange={(e) => setMin(+e.target.value)}
                />
              </div>
              <div>
                <label>Max PKR</label>
                <input
                  className="userlist-search"
                  type="number"
                  value={max}
                  onChange={(e) => setMax(+e.target.value)}
                />
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <label>Fee (%)</label>
              <input
                className="userlist-search"
                type="number"
                step="0.1"
                value={fee}
                onChange={(e) => setFee(+e.target.value)}
              />
            </div>
            <div style={{ marginTop: 16 }}>
              <button className="action-btn" onClick={onSave}>
                Save
              </button>
              {saved && (
                <span style={{ color: "#22c55e", marginLeft: 12 }}>Saved</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
