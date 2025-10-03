import { useEffect, useState, useMemo } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/userlist.css";
import axios from "axios";

export default function PendingWithdrawals() {
  const [q, setQ] = useState("");
  const [withdrawal, setwithdrawal] = useState([]);

  // Fetch withdrawal from backend
  useEffect(() => {
    const fetchwithdrawal = async () => {
      try {
        const res = await axios.get("https://be.solarx0.com/api/payments");
        // ✅ backend returns { success, payments }
        console.log(res.data.data);
        setwithdrawal(res.data.data || []);
      } catch (error) {
        console.error("Error fetching withdrawal:", error);
        setwithdrawal([]);
      }
    };

    fetchwithdrawal();
  }, []);

  // Search + filter
  // Search + filter
  const filtered = useMemo(() => {
    return (withdrawal || [])
      .filter((d) => d.withdrawalStatus === "pending") // ✅ only pending
      .filter((d) => JSON.stringify(d).toLowerCase().includes(q.toLowerCase()));
  }, [withdrawal, q]);

  // Update status
  const handleStatusChange = async (userId, newStatus, _id) => {
    try {
      const res = await axios.post("https://be.solarx0.com/api/status", {
        userId: userId,
        status: newStatus,
        type: "withdrawal",
        requesId: _id,
      });

      alert(res.data.message);

      // ✅ Update frontend state without reload
      setwithdrawal((prev) =>
        prev.map((d) =>
          d._id === _id ? { ...d, depositStatus: newStatus } : d
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  console.log(q);

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2>Pending Withdrawals</h2>

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
                <th>Account Number</th>
                <th>Account Holder Name</th>
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
                    PKR {d.withdrawalsAmount?.toLocaleString()}
                  </td>
                  <td data-label="Date">
                    {new Date(d.createdAt).toLocaleDateString()}
                  </td>
                  <td data-label="Proof">{d.accountNumber}</td>
                  <td data-label="Status">{d.accountHolderName}</td>
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
