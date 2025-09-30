// src/admin/pages/Settings/SecuritySettings.jsx
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { useMockStore } from "../../store";
import "../../styles/admin.css";

export default function SecuritySettings() {
  const { db, saveSettings } = useMockStore();
  const [twoFA, setTwoFA] = useState(db.settings.security.twoFA);
  const [captcha, setCaptcha] = useState(db.settings.security.captcha);

  const handleSave = () => {
    saveSettings({ security: { twoFA, captcha } });
    alert("Security settings saved!");
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2>Security Settings</h2>
          <div className="card-box" style={{ padding: 16 }}>
            <div style={{ marginBottom: 12 }}>
              <label>Two-Factor Auth</label>
              <select
                className="userlist-search"
                value={twoFA ? "1" : "0"}
                onChange={(e) => setTwoFA(e.target.value === "1")}
              >
                <option value="1">Enabled</option>
                <option value="0">Disabled</option>
              </select>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Captcha</label>
              <select
                className="userlist-search"
                value={captcha ? "1" : "0"}
                onChange={(e) => setCaptcha(e.target.value === "1")}
              >
                <option value="1">Enabled</option>
                <option value="0">Disabled</option>
              </select>
            </div>
            <button className="action-btn" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
