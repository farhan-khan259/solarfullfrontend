import { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Deposit.css";

import logojazzcash from "../../Assets/Pictures/jazzcash.png";
import logoeasypaisaa from "../../Assets/Pictures/unnamed-removebg-preview.png";

export default function Deposit() {
  const [selectedMethod, setSelectedMethod] = useState("Easypaisa(C2C)");
  const [customAmount, setCustomAmount] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Unified popup state
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success"); // "success" | "error"
  const [showPopup, setShowPopup] = useState(false);

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const userId = user?._id;

  const numberRef = useRef(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "/";
    }
  }, []);

  const methods = [
    { name: "Easypaisa(C2C)", bonus: "3%" },
    { name: "JazzCash(C2C)", bonus: "3%" },
  ];

  const images = {
    "Easypaisa(C2C)": logoeasypaisaa,
    "JazzCash(C2C)": logojazzcash,
  };

  const accounts = {
    "Easypaisa(C2C)": {
      number: "03377458802",
      name: "Tanveer Abbas",
    },
    "JazzCash(C2C)": {
      number: "03241984642",
      name: "Muhammad Asghar",
    },
  };

  // ✅ Bonus calculation
  const amountToDisplay = customAmount
    ? (parseFloat(customAmount) + parseFloat(customAmount) * 0.03).toFixed(0)
    : "00";

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const copyToClipboard = () => {
    const numberText = numberRef.current?.childNodes[0]?.nodeValue?.trim();
    if (numberText) {
      navigator.clipboard.writeText(numberText);
    }
  };

  const handleSubmit = async () => {
    if (!customAmount || parseFloat(customAmount) < 1000) {
      setPopupType("error");
      setPopupMessage("❌ Minimum deposit amount is Rs. 1000");
      setShowPopup(true);
      return;
    }

    if (!imageFile) {
      setPopupType("error");
      setPopupMessage("❌ Please upload a screenshot of your payment");
      setShowPopup(true);
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("amount", amountToDisplay);
      formData.append("payment_method", selectedMethod);
      formData.append("screenshot", imageFile);

      const response = await fetch("https://be.solarx0.com/api/deposit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setPopupType("success");
        setPopupMessage("✅ Deposit request submitted successfully!");
        setShowPopup(true);

        // reset form
        setCustomAmount("");
        setImage(null);
        setImageFile(null);
      } else {
        setPopupType("error");
        setPopupMessage(`❌ ${data.message || "Deposit request failed"}`);
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error submitting deposit:", error);
      setPopupType("error");
      setPopupMessage("❌ Network error. Please try again.");
      setShowPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="deposit-form">
        <div className="header">
          <button className="back-btnnn">
            <div>
              <Link to="/dashboard">
                <FaArrowLeft />
              </Link>
            </div>
          </button>
          <h2>Deposit Funds</h2>
        </div>

        <div className="methods">
          {methods.map((m) => (
            <div
              key={m.name}
              className={`method ${selectedMethod === m.name ? "active" : ""}`}
              onClick={() => setSelectedMethod(m.name)}
            >
              {m.name}
              <span className="badgedeposit">+{m.bonus} Bonus</span>
            </div>
          ))}
        </div>

        <input
          type="number"
          className="custom-input"
          placeholder="Rs Min 1000 - Max Unlimited"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          min="1000"
          max="50000"
          step="1"
        />
      </div>

      <div
        className={`payment-container ${
          selectedMethod.includes("Easy")
            ? "easypaisa-active"
            : "jazzcash-active"
        }`}
      >
        <div className="amount-box2">
          <div className="amount-text2">
            <p>
              AMOUNT OF PAYMENT <span style={{ color: "red" }}>+ 3%</span>
            </p>

            <h1>{amountToDisplay}</h1>
            <p className="warning">
              The payment amount must be consistent with the order amount.
            </p>
          </div>
          <div>
            <img
              className="logoeasypaisaa1"
              src={images[selectedMethod]}
              alt=""
            />
            <p className="easypaisa-label">
              Only Support {selectedMethod.split("(")[0]} Wallet
            </p>
          </div>
        </div>

        <div className="steps-box">
          {/* Step 1 */}
          <p>
            <strong>Step 1:</strong> Copy Receive Wallet Account
          </p>

          <div className="wallet-card">
            <div className="wallet-info">
              <p className="wallet-title">Account Holder Name</p>
              <p className="wallet-name">{accounts[selectedMethod].name}</p>
              <div className="divider"></div>
              <p className="wallet-title">Account Number</p>
              <div className="number-row">
                <span ref={numberRef}>{accounts[selectedMethod].number}</span>
                <span className="copy-icon" onClick={copyToClipboard}>
                  📋
                </span>
              </div>
            </div>

            <img
              src={images[selectedMethod]}
              className="wallet-logo"
              alt="wallet"
            />
          </div>

          <p className="tip">
            Tip: Each recharge must get new online account, otherwise money
            can't reach
          </p>

          <p>
            <strong>Step 2:</strong> Open
            <span className="highlight">
              {selectedMethod.split("(")[0]}
            </span>{" "}
            APP To Complete Transfer and Upload Recipt
          </p>

          <div className="easypaisa-logo">
            <label htmlFor="imageUpload" className="upload-box">
              {image ? (
                <img src={image} alt="Uploaded" className="preview-image" />
              ) : (
                <FiUploadCloud className="upload-icon" />
              )}
              <input
                type="file"
                accept="image/*"
                id="imageUpload"
                onChange={handleImageUpload}
                hidden
              />
            </label>
          </div>
          <button
            className="submit-btndep"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Submit"}
          </button>
        </div>
      </div>

      {/* ✅ Unified Popup */}
      {showPopup && (
        <div className="deposit-success-overlay">
          <div className={`deposit-success-box ${popupType}`}>
            <h2>
              {popupType === "success"
                ? "✅ Deposit Completed"
                : "⚠️ Deposit Failed"}
            </h2>
            <p>{popupMessage}</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
