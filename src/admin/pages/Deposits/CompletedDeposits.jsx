import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/userlist.css";

export default function CompletedDeposits() {
  const [q, setQ] = useState("");
  const [deposits, setDeposits] = useState([]);

  // Fetch deposits from backend
  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const res = await axios.get("https://be.solarx0.com/api/payments");
        // ✅ backend returns { success, payments }
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
      .filter((d) => d.depositStatus === "approved") // ✅ only pending
      .filter((d) => JSON.stringify(d).toLowerCase().includes(q.toLowerCase()));
  }, [deposits, q]);
  console.log(filtered);
  // Update status
  console.log(deposits);

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2>Completed Deposits</h2>

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
                  <td data-label="Amount">PKR {d.depositsAmount}</td>
                  <td data-label="Date">
                    {new Date(d.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && <p>No completed deposits found.</p>}
        </div>
      </div>
    </div>
  );
}
