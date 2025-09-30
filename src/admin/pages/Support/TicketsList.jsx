// src/admin/pages/Support/TicketsList.jsx
import React from "react";
import { useMockStore } from "../../store";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/admin.css";

export default function TicketsList() {
  const { db } = useMockStore();

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2>Support Tickets</h2>
          <div className="card-box" style={{ padding: 12 }}>
            {db.tickets.map((t) => (
              <div
                key={t.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 8,
                  borderBottom: "1px solid #eee",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>{t.subject}</div>
                  <div style={{ color: "#666", fontSize: 13 }}>
                    {t.id} • UID {t.uid} • {t.status}
                  </div>
                </div>
                <div>
                  <Link
                    to={`/admin/support/tickets/${t.id}`}
                    className="action-btn view"
                  >
                    Open
                  </Link>
                </div>
              </div>
            ))}
            {db.tickets.length === 0 && (
              <div style={{ padding: 12, textAlign: "center", color: "#666" }}>
                No tickets found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
