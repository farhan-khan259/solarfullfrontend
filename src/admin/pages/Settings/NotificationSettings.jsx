// src/admin/pages/Settings/NotificationSettings.jsx
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { useMockStore } from "../../store";
import "../../styles/admin.css";

export default function NotificationSettings() {
  const { db, saveSettings } = useMockStore();
  const [email, setEmail] = useState(db.settings.notifications.email);
  const [sms, setSms] = useState(db.settings.notifications.sms);

  const handleSave = () => {
    saveSettings({ notifications: { email, sms } });
    alert("Notification settings saved!");
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2>Notification Settings</h2>
          <div className="card-box" style={{ padding: 16 }}>
            <div style={{ marginBottom: 12 }}>
              <label>Email</label>
              <select
                className="userlist-search"
                value={email ? "1" : "0"}
                onChange={(e) => setEmail(e.target.value === "1")}
              >
                <option value="1">On</option>
                <option value="0">Off</option>
              </select>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>SMS</label>
              <select
                className="userlist-search"
                value={sms ? "1" : "0"}
                onChange={(e) => setSms(e.target.value === "1")}
              >
                <option value="1">On</option>
                <option value="0">Off</option>
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
