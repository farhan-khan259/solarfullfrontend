// src/admin/pages/Referrals/ReferralSettings.jsx
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { useMockStore } from "../../store";
import "../../styles/admin.css";

export default function ReferralSettings() {
  const { saveSettings } = useMockStore(); // removed 'db' since it's unused
  const [l1, setL1] = useState(8);
  const [l2, setL2] = useState(3);
  const [l3, setL3] = useState(2);

  const handleSave = () => {
    saveSettings({ referral: { l1, l2, l3 } });
    alert("Referral settings saved successfully!");
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2 style={{ marginBottom: 12 }}>Referral Settings</h2>
          <div className="card-box" style={{ padding: 16 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(100px, 1fr ,1fr))",
                gap: 12,
              }}
            >
              <div>
                <label>Level 1 (%)</label>
                <input
                  className="userlist-search"
                  type="number"
                  min={0}
                  value={l1}
                  onChange={(e) => setL1(+e.target.value)}
                />
              </div>
              <div>
                <label>Level 2 (%)</label>
                <input
                  className="userlist-search"
                  type="number"
                  min={0}
                  value={l2}
                  onChange={(e) => setL2(+e.target.value)}
                />
              </div>
              <div>
                <label>Level 3 (%)</label>
                <input
                  className="userlist-search"
                  type="number"
                  min={0}
                  value={l3}
                  onChange={(e) => setL3(+e.target.value)}
                />
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <button className="action-btn" onClick={handleSave}>
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
