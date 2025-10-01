// src/admin/pages/Transactions/AllTransactions.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/admin.css";

export default function AllTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "https://be.solarx0.com/api/admin/transactions"
        );

        // ✅ Fix: make sure transactions is always an array
        setTransactions(response.data.transactions || []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setTransactions([]); // fallback to empty
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-main">
          <Topbar />
          <div className="admin-content">
            <h2>Loading...</h2>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2>All Transactions</h2>
          <div className="card-box" style={{ padding: 12 }}>
            <table className="userlist-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>UID</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id}>
                    <td data-label="ID">{t._id}</td>
                    <td data-label="Type">
                      {t.depositStatus ? "Deposit" : "Withdrawal"}
                    </td>
                    <td data-label="UID">{t.user_id}</td>
                    <td data-label="Amount">PKR {t.deposits}</td>
                    <td data-label="Date">{t.createdAt}</td>
                    <td data-label="Status">{t.depositStatus}</td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      style={{ textAlign: "center", color: "#666" }}
                    >
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
