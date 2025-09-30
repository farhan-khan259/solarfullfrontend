// src/admin/pages/Plans/AddPlan.jsx
import React from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function AddPlan() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2>Add / Edit Plan</h2>
          <div
            style={{
              padding: 20,
              background: "#fff",
              borderRadius: 10,
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <p>
              Use the Plans List page to add or edit plans via the modal
              interface.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
