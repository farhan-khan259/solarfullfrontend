import { useEffect, useState } from "react";
import "./WelcomePopup.css";

export default function WelcomePopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if popup has already been shown in this login session
    const hasSeenPopup = localStorage.getItem("welcomePopupShown");

    if (!hasSeenPopup) {
      setShowPopup(true);
      localStorage.setItem("welcomePopupShown", "true"); // prevent showing again
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="popup-header">
              <h2>Nixor Prime</h2>
              <button className="close-btn" onClick={handleClose}>
                ✖
              </button>
            </div>

            <div className="popup-content">
              <p>1) Nixor Prime is Launched on 02 September 2024.</p>
              <p>2) Nixor Prime has 2 years Contract.</p>
              <p>3) Minimum deposit on Nixor Prime is 1000 PKR.</p>
              <p>4) Minimum withdrawal is 350 PKR.</p>
              <p>5) Profit can be withdrawn when balance is 350 or more.</p>
              <p>6) No fee on withdrawal.</p>
              <p>7) Join WhatsApp group for more info.</p>
              <p>
                <b style={{ color: "green" }}>
                  8) On a team investment of 1 lakh rupees, you will receive an
                  extra reward of 2000 rupees.
                </b>
              </p>
              <p>
                <b>9) WITHDRAWAL TIME:</b> 10 AM TO 7 PM <br />
                <b>DEPOSIT TIME:</b> 24 Hours
              </p>
            </div>

            <div className="popup-actions">
              <button className="btn-primary">JOIN WHATSAPP GROUP</button>
              <button className="btn-primary">DOWNLOAD APP</button>
              <button className="btn-secondary" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
