// src/admin/pages/Settings/PaymentSettings.jsx
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { useMockStore } from "../../store";
import "../../styles/payment-settings.css";

export default function PaymentSettings() {
  const { db, saveSettings } = useMockStore();

  const [activeMethod, setActiveMethod] = useState("JazzCash"); // default
  const [formData, setFormData] = useState({
    accountNumber: "",
    accountName: "",
    status: true,
  });

  // Load data once on mount
  useEffect(() => {
    if (db?.settings?.payments) {
      setFormData({
        accountNumber: db.settings.payments.jazzcash?.[0] || "",
        accountName: "Jazz Cash",
        status: true,
      });
    }
  }, [db]);

  // Handle dropdown change
  const handleMethodChange = (method) => {
    setActiveMethod(method);

    if (method === "Easypaisa") {
      setFormData({
        accountNumber: db.settings.payments.easypaisa?.[0] || "",
        accountName: "Easypaisa",
        status: true,
      });
    } else if (method === "JazzCash") {
      setFormData({
        accountNumber: db.settings.payments.jazzcash?.[0] || "",
        accountName: "Jazz Cash",
        status: true,
      });
    } else if (method === "Bank Account") {
      setFormData({
        accountNumber: db.settings.payments.bank?.accountNumber || "",
        accountName: db.settings.payments.bank?.accountName || "",
        status: true,
      });
    }
  };

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save data
  const onSave = () => {
    const updatedData = { ...db.settings.payments };

    if (activeMethod === "Easypaisa") {
      updatedData.easypaisa = [formData.accountNumber];
    } else if (activeMethod === "JazzCash") {
      updatedData.jazzcash = [formData.accountNumber];
    } else if (activeMethod === "Bank Account") {
      updatedData.bank = {
        accountNumber: formData.accountNumber,
        accountName: formData.accountName,
        bankName: "Bank",
      };
    }

    saveSettings({ payments: updatedData });
    alert(`${activeMethod} details updated successfully!`);
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2>Payment Settings</h2>
          <div className="card-box payment-card">
            {/* Dropdown */}
            <div className="form-group">
              <label className="form-label">Payment Method*</label>
              <select
                className="form-input"
                value={activeMethod}
                onChange={(e) => handleMethodChange(e.target.value)}
              >
                <option>Easypaisa</option>
                <option>JazzCash</option>
                <option>Bank Account</option>
              </select>
            </div>

            {/* Status */}
            <div className="form-group">
              <label className="form-label">Status*</label>
              <span
                className={`status-badge ${
                  formData.status ? "enabled" : "disabled"
                }`}
              >
                {formData.status ? "Enabled" : "Disabled"}
              </span>
            </div>

            {/* Action */}
            <div className="form-group">
              <label className="form-label">Action*</label>
              <button
                className={`action-btn ${
                  formData.status ? "disable" : "enable"
                }`}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, status: !prev.status }))
                }
              >
                {formData.status ? "Disable" : "Enable"}
              </button>
            </div>

            {/* Account Number */}
            <div className="form-group">
              <label className="form-label">Account Number*</label>
              <input
                type="text"
                className="form-input"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
              />
            </div>

            {/* Bank Account Name */}
            <div className="form-group">
              <label className="form-label">Bank Account Name*</label>
              <input
                type="text"
                className="form-input"
                name="accountName"
                value={formData.accountName}
                onChange={handleChange}
              />
            </div>

            {/* Submit */}
            <button className="submit-btn" onClick={onSave}>
              ✅ Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
