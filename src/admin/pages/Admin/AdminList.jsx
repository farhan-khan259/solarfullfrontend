// src/admin/pages/Admin/AdminList.jsx
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/admin.css";
import "../../styles/userlist.css";

export default function AdminList() {
  // Static admin info — always Sajjid
  const mainAdmin = { id: 1, name: "Sajjid", role: "Super Admin" };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2>Admin Account</h2>
          <div className="card-box" style={{ padding: 12 }}>
            <div
              key={mainAdmin.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 8,
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <strong>{mainAdmin.name}</strong>
                <div style={{ color: "#666" }}>{mainAdmin.role}</div>
              </div>
              <div>
                <button
                  className="action-btn delete"
                  disabled
                  style={{ cursor: "not-allowed", opacity: 0.5 }}
                >
                  Cannot Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
