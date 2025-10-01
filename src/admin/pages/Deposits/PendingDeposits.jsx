// src/admin/pages/Deposits/PendingDeposits.jsx
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/userlist.css";

export default function PendingDeposits() {
  const [q, setQ] = useState("");
  const [deposits, setDeposits] = useState([]);

  // Fetch deposits from backend
  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const res = await axios.get("https://be.solarx0.com/api/payments");
        // ✅ backend returns { success, payments }
        console.log(res.data.data);
        setDeposits(res.data.data || []);
      } catch (error) {
        console.error("Error fetching deposits:", error);
        setDeposits([]);
      }
    };

    fetchDeposits();
  }, []);

  // Search + filter
  // Search + filter
  const filtered = useMemo(() => {
    return (deposits || [])
      .filter((d) => d.depositStatus === "pending") // ✅ only pending
      .filter((d) => JSON.stringify(d).toLowerCase().includes(q.toLowerCase()));
  }, [deposits, q]);

  // Update status
  const handleStatusChange = async (userId, newStatus, _id) => {
    try {
      const res = await axios.post("https://be.solarx0.com/api/status", {
        userId: userId,
        status: newStatus,
        type: "deposit",
        requesId: _id,
      });

      alert(res.data.message);

      // ✅ Update frontend state without reload
      setDeposits((prev) =>
        prev.map((d) =>
          d._id === _id ? { ...d, depositStatus: newStatus } : d
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2>Pending Deposits</h2>

          <div style={{ marginBottom: 12 }}>
            <input
              placeholder="Search UID, method, amount..."
              className="userlist-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <table className="userlist-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Proof</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d._id}>
                  <td data-label="ID">{d._id}</td>
                  <td data-label="User">{d.user_id}</td>
                  <td data-label="Method">{d.payment_method}</td>
                  <td data-label="Amount">
                    PKR {d.depositsAmount?.toLocaleString()}
                  </td>
                  <td data-label="Date">
                    {new Date(d.createdAt).toLocaleDateString()}
                  </td>
                  <td data-label="Proof">
                    {d.screenshot ? (
                      <a
                        href={`https://be.solarx0.com/${d.screenshot}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    ) : (
                      "No proof"
                    )}
                  </td>
                  <td data-label="Status">{d.depositStatus}</td>
                  <td data-label="Actions">
                    <button
                      className="action-btn view"
                      onClick={() =>
                        handleStatusChange(d.user_id, "approved", d._id)
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() =>
                        handleStatusChange(d.user_id, "reject", d._id)
                      }
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && <p>No pending deposits found.</p>}
        </div>
      </div>
    </div>
  );
}
