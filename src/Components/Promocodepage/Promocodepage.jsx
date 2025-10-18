import axios from "axios";
import { useState } from "react";
import { FaArrowLeft, FaInfoCircle, FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Promocodepage.css";

const Promocodepage = () => {
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const userId = user?._id;

  const [promoCode, setPromoCode] = useState("");
  const [message, setMessage] = useState(null);

  const handleRedeem = async () => {
    if (!promoCode.trim()) {
      setMessage({ type: "error", text: "Please enter a promo code" });
      return;
    }

    try {
      const response = await axios.post(
        "https://be.solarx0.com/api/promoCode/apply",
        {
          code: promoCode,
          userId: userId,
        }
      );

      if (response.data.success) {
        setMessage({
          type: "success",
          text: `Promo applied successfully! You received Rs${response.data.amount}`,
        });
      } else {
        setMessage({ type: "error", text: response.data.message });
      }
    } catch (error) {
      console.error("Error redeeming promo:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to redeem promo",
      });
    }
  };

  return (
    <div className="promo-container">
      {/* Header */}
      <div className="promo-header-row">
        <Link to="/setting" className="back-link">
          <FaArrowLeft />
        </Link>
        <h1 className="promo-heading">Promo Code System</h1>
      </div>
      <p className="promo-subtitle">Daily reward opportunity for everyone!</p>

      {/* Input */}
      <div className="promo-input-box">
        <input
          type="text"
          placeholder="Enter Promo Code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <button className="redeem-btn" onClick={handleRedeem}>
          Redeem
        </button>
      </div>

      {/* ✅ Show message */}
      {message && (
        <p style={{ color: message.type === "success" ? "green" : "red" }}>
          {message.text}
        </p>
      )}

      <div className="promo-join">
        <p>
          <b>Want exclusive high-reward promo codes?</b> <br />
          <b style={{ color: "#2945ff" }}>
            Join our official WhatsApp channel for special Promo code!
          </b>
        </p>
        <button className="join-btn">
          <Link to="https://chat.whatsapp.com/E3V0WcJKMru954hzfPIGMy?mode=wwt">
            <FaLink /> Join Channel
          </Link>
        </button>
      </div>

      {/* How It Works */}
      <section className="promo-section">
        <h3>
          <FaInfoCircle /> How It Works
        </h3>
        <ul>
          🌟 By inviting 30 active members, you will become one of our superior
          leaders! 🎉 The company will grant you the authority to generate a
          daily promo code for your teams. 🛠️ Each member can use this promo
          code once within a 24-hour period ⏰, and the rewards will range
          randomly from 1 PKR to 300 PKR! 💰✨
        </ul>
      </section>
    </div>
  );
};

export default Promocodepage;
