// src/admin/pages/Admin/Roles.jsx
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/admin.css";

export default function Roles() {
  // Dummy roles — replace later with backend data
  const [roles, setRoles] = useState([
    { id: 1, name: "Super Admin", description: "Full access to all features." },
    {
      id: 2,
      name: "Finance Manager",
      description: "Handles deposits and withdrawals.",
    },
    { id: 3, name: "Support Staff", description: "Manages customer queries." },
  ]);

  const [newRole, setNewRole] = useState({ name: "", description: "" });

  const handleAddRole = () => {
    if (!newRole.name.trim()) {
      alert("Role name is required");
      return;
    }
    const id = roles.length ? roles[roles.length - 1].id + 1 : 1;
    setRoles([...roles, { id, ...newRole }]);
    setNewRole({ name: "", description: "" });
    alert("Role added (stub — wire to backend)");
  };

  const handleEditRole = (id) => {
    alert(`Edit role with ID: ${id} (stub — wire to backend)`);
  };

  const handleDeleteRole = (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      setRoles(roles.filter((r) => r.id !== id));
      alert("Role deleted (stub — wire to backend)");
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2>Role Management</h2>

          {/* Role list */}
          <div className="card-box" style={{ padding: 16, marginBottom: 20 }}>
            <h3 style={{ marginBottom: 12 }}>Existing Roles</h3>
            {roles.length === 0 ? (
              <p style={{ color: "#666" }}>No roles defined.</p>
            ) : (
              roles.map((role) => (
                <div
                  key={role.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <div>
                    <strong>{role.name}</strong>
                    <div style={{ color: "#666", fontSize: "0.9rem" }}>
                      {role.description}
                    </div>
                  </div>
                  <div>
                    <button
                      className="action-btn"
                      style={{ marginRight: 8 }}
                      onClick={() => handleEditRole(role.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDeleteRole(role.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add new role */}
          <div className="card-box" style={{ padding: 16 }}>
            <h3 style={{ marginBottom: 12 }}>Add New Role</h3>
            <div style={{ marginBottom: 8 }}>
              <input
                type="text"
                placeholder="Role Name"
                value={newRole.name}
                onChange={(e) =>
                  setNewRole({ ...newRole, name: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: 8,
                  marginBottom: 8,
                  border: "1px solid #ccc",
                  borderRadius: 4,
                }}
              />
              <textarea
                placeholder="Role Description"
                value={newRole.description}
                onChange={(e) =>
                  setNewRole({ ...newRole, description: e.target.value })
                }
                rows="3"
                style={{
                  width: "100%",
                  padding: 8,
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  marginBottom: 8,
                }}
              />
            </div>
            <button className="action-btn" onClick={handleAddRole}>
              Add Role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
