// src/admin/pages/Support/TicketDetails.jsx
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { useMockStore } from "../../store";
import "../../styles/admin.css";

export default function TicketDetails() {
  const { id } = useParams();
  const { db } = useMockStore();

  // Safely find ticket (fallback if not found)
  const ticket = db?.tickets?.find((t) => String(t.id) === String(id));

  // Optional reply box state
  const [reply, setReply] = useState("");

  const handleReply = () => {
    if (!reply.trim()) {
      alert("Please type a reply before sending.");
      return;
    }
    // Here you could push to backend or store
    alert(`Reply sent: ${reply}`);
    setReply("");
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          {/* Back to ticket list */}
          <div style={{ marginBottom: 12 }}>
            <Link
              to="/admin/support"
              style={{ textDecoration: "none", color: "#007bff" }}
            >
              ← Back to Tickets
            </Link>
          </div>

          {!ticket ? (
            <div
              className="card-box"
              style={{ padding: 16, textAlign: "center" }}
            >
              <h3 style={{ margin: 0, color: "#555" }}>Ticket not found</h3>
              <p style={{ marginTop: 8 }}>
                The ticket ID you requested does not exist.
              </p>
            </div>
          ) : (
            <>
              <h2 style={{ marginBottom: 16 }}>Ticket #{ticket.id}</h2>
              <div className="card-box" style={{ padding: 12 }}>
                {ticket.messages && ticket.messages.length > 0 ? (
                  ticket.messages.map((m, i) => (
                    <div
                      key={i}
                      style={{
                        padding: 10,
                        borderBottom:
                          i !== ticket.messages.length - 1
                            ? "1px solid #eee"
                            : "none",
                        marginBottom: 6,
                      }}
                    >
                      <div
                        style={{ color: "#666", fontSize: 13, marginBottom: 4 }}
                      >
                        <strong>{m.from || "Unknown"}</strong> •{" "}
                        {m.at ? new Date(m.at).toLocaleString() : "No date"}
                      </div>
                      <div>{m.text || "No message text"}</div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "#888" }}>
                    No messages in this ticket yet.
                  </p>
                )}
              </div>

              {/* Optional reply box */}
              <div className="card-box" style={{ padding: 12, marginTop: 16 }}>
                <h3 style={{ marginBottom: 12 }}>Reply to Ticket</h3>
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your reply..."
                  style={{ width: "100%", minHeight: 80, padding: 8 }}
                />
                <button
                  className="action-btn"
                  style={{ marginTop: 8 }}
                  onClick={handleReply}
                >
                  Send Reply
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
