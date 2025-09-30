import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/userlist.css";

export default function CompletedWithdrawals() {
  const [q, setQ] = useState("");
  const [Withdrawals, setWithdrawals] = useState([]);

  // Fetch Withdrawals from backend
  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const res = await axios.get("http://localhost:3005/api/payments");
        // ✅ backend returns { success, payments }
        setWithdrawals(res.data.data || []);
      } catch (error) {
        console.error("Error fetching Withdrawals:", error);
        setWithdrawals([]);
      }
    };

    fetchWithdrawals();
  }, []);

  // Search + filter
  // Search + filter
  const filtered = useMemo(() => {
    return (Withdrawals || [])
      .filter((d) => d.withdrawalStatus === "approved") // ✅ only pending
      .filter((d) => JSON.stringify(d).toLowerCase().includes(q.toLowerCase()));
  }, [Withdrawals, q]);
  console.log(filtered);
  // Update status
  console.log(Withdrawals);

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2>Completed Withdrawals</h2>

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
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d._id}>
                  <td data-label="ID">{d._id}</td>
                  <td data-label="User">{d.user_id}</td>
                  <td data-label="Method">{d.payment_method}</td>
                  <td data-label="Amount">PKR {d.withdrawalsAmount}</td>
                  <td data-label="Date">
                    {new Date(d.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && <p>No completed Withdrawals found.</p>}
        </div>
      </div>
    </div>
  );
}
