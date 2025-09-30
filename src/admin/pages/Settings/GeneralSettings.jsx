// src/admin/pages/Settings/GeneralSettings.jsx
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { useMockStore } from "../../store";
import "../../styles/admin.css";

export default function GeneralSettings() {
  const { db, saveSettings } = useMockStore();
  const [siteName, setSiteName] = useState(db.settings.siteName || "Solarx0");
  const [currency, setCurrency] = useState(db.settings.currency || "PKR");
  const [contact, setContact] = useState(
    db.settings.general.contact || "support@solarx0.com"
  );

  const handleSave = () => {
    saveSettings({ siteName, currency, general: { contact } });
    alert("Settings saved successfully!");
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2>General Settings</h2>
          <div className="card-box" style={{ padding: 16 }}>
            <div style={{ marginBottom: 12 }}>
              <label>Site Name</label>
              <input
                className="userlist-search"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Currency</label>
              <input
                className="userlist-search"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Contact Email</label>
              <input
                className="userlist-search"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <button className="action-btn" onClick={handleSave}>
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
