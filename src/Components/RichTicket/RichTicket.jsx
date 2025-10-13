import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FaTicketAlt } from "react-icons/fa";
import { FaArrowLeft, FaClockRotateLeft, FaShuffle } from "react-icons/fa6";
import { MdShoppingCartCheckout } from "react-icons/md";
import richtickeet from "../../Assets/Pictures/richticket.jpeg";
import "./RichTicket.css";

const API_BASE = "https://be.solarx0.com/api";

const RichTicket = ({ navigateBack }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;

  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [boughtTickets, setBoughtTickets] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [balance, setBalance] = useState(0);

  const fetchUserBalance = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await axios.post("https://be.solarx0.com/team", { userId });
      const newBalance = res.data?.user?.userbalance ?? 0;
      setBalance(newBalance);

      // ✅ Move localStorage read inside the callback
      const localUser = JSON.parse(localStorage.getItem("user")) || {};
      const updatedUser = { ...localUser, userbalance: newBalance };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Error fetching user balance:", err);
    }
  }, [userId]);

  const fetchTickets = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/tickets/random`);
      setTickets(res.data.tickets || []);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  }, []);

  const fetchBoughtTickets = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`${API_BASE}/tickets/user/${userId}`);
      setBoughtTickets(res.data.tickets || []);
    } catch (err) {
      console.error("Error fetching bought tickets:", err);
    }
  }, [userId]);

  const fetchHistory = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`${API_BASE}/tickets/history/${userId}`);
      setHistory(res.data.history || []);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  }, [userId]);

  useEffect(() => {
    fetchTickets();
    fetchBoughtTickets();
    fetchUserBalance();
  }, [fetchTickets, fetchBoughtTickets, fetchUserBalance]);

  const handleBuyTicket = async () => {
    if (!selectedTicket) {
      alert("Please select a ticket first!");
      return;
    }

    if (balance < 500) {
      alert("Insufficient balance to buy a ticket!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/tickets/buy`, {
        userId,
        ticketNumber: selectedTicket,
      });

      if (res.data.success) {
        alert("✅ Ticket purchased successfully!");

        // Auto-refresh all relevant data
        await Promise.all([
          fetchUserBalance(),
          fetchBoughtTickets(),
          fetchTickets(),
        ]);

        setSelectedTicket(null);
      } else {
        alert(res.data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error buying ticket:", err);
      alert(err.response?.data?.message || "❌ Error buying ticket!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rich-ticket-container">
      {/* ✅ Back Button + Title in same line */}
      <div className="page-header">
        <FaArrowLeft
          className="back-iconrich"
          onClick={() => window.history.back()}
        />
        <h2 className="page-title">🎟️ SolarX Rich Ticket</h2>
      </div>

      <div className="balance-box">
        <p>
          Your Balance: <strong>Rs {balance.toLocaleString()}</strong>
        </p>
      </div>

      <div className="ticket-controls">
        <button className="shuffle-btn" onClick={fetchTickets}>
          <FaShuffle /> Shuffle
        </button>
        <button
          className="history-btn"
          onClick={() => {
            setShowHistory(!showHistory);
            if (!showHistory) fetchHistory();
          }}
        >
          <FaClockRotateLeft /> {showHistory ? "Hide History" : "View History"}
        </button>
      </div>

      {!showHistory ? (
        <>
          <div className="ticket-grid">
            {tickets.map((num) => (
              <div
                key={num}
                className={`ticket-card ${
                  selectedTicket === num ? "selected" : ""
                }`}
                onClick={() => setSelectedTicket(num)}
              >
                <FaTicketAlt className="ticket-icon" />
                <p>{num}</p>
              </div>
            ))}
          </div>

          <button
            className="buy-btn"
            onClick={handleBuyTicket}
            disabled={loading}
          >
            <MdShoppingCartCheckout />{" "}
            {loading ? "Processing..." : "Buy Ticket (Rs 500)"}
          </button>

          <div className="bought-section">
            <h3>Bought Tickets</h3>
            {boughtTickets.length === 0 ? (
              <p>No tickets bought yet.</p>
            ) : (
              <div className="bought-grid">
                {boughtTickets.map((t) => (
                  <div key={t._id} className="bought-card">
                    <p>{t.ticketNumber}</p>
                    <span className={`status ${t.status}`}>{t.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="history-section">
          <h3>Ticket History</h3>
          {history.length === 0 ? (
            <p>No history found.</p>
          ) : (
            <table className="history-table">
              <thead>
                <tr>
                  <th>Ticket Number</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Bought On</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => (
                  <tr key={i}>
                    <td>{h.ticketNumber}</td>
                    <td>Rs {h.price}</td>
                    <td className={`status ${h.status}`}>
                      {h.status?.toUpperCase()}
                    </td>
                    <td>{h.boughtOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* 🖼 Responsive Image Section */}
      <div className="rich-image-box">
        <img
          src={richtickeet}
          alt="Rich Ticket Promotion"
          className="rich-image"
        />
      </div>

      <div className="terms-box">
        <h4>📜 Terms & Conditions</h4>
        <ul>
          <li>
            {" "}
            <b>Ticket Price:</b> Each ticket costs Rs 500. If you buy 2 rich
            tickets, you get 1 free.
          </li>
          <li>
            <b>Unique Numbers:</b> You cannot use duplicate ticket numbers.
          </li>
          <li>
            {" "}
            <b>Draw Timing:</b> The lucky draw will take place every Sunday at
            7:00 PM.
          </li>
          <li>
            {" "}
            <b> Prizes:</b> There will be 3 lucky winners who will receive cash
            prizes in their SolarX accounts.
          </li>
          <li>
            {" "}
            <b> Final Results:</b> Once the draw is complete, all results are
            final.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RichTicket;
