import {
  FaArrowLeft,
  FaHeadset,
  FaMoneyBillWave,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Support.css";

export default function Support() {
  const services = [
    {
      label: "WhatsApp Group",
      icon: <FaWhatsapp />,
      color: "#25d366", // WhatsApp green
      link: "https://chat.whatsapp.com/Lpr8zYBWQS85O5fjSC0mdh?mode=ems_copy_t",
    },
    {
      label: "WhatsApp Channel",
      icon: <FaWhatsapp />,
      color: "#128c7e",
      link: "https://whatsapp.com/channel/0029VbAhvj35K3zaTDKLf32U",
    },
    {
      label: "Withdraw+Deposit Issue",
      icon: <FaMoneyBillWave />,
      color: "#2a9d8f",
      link: "https://wa.me/923357918372",
    },
    {
      label: "Customer Service",
      icon: <FaHeadset />,
      color: "#6c5ce7",
      link: "https://wa.me/923356784524",
    },
    {
      label: "Telegram Group",
      icon: <FaTelegramPlane />,
      color: "#229ED9", // Telegram blue
      link: "https://t.me/+POADMsqnKTJhNzdk",
    },
    {
      label: "Telegram Service",
      icon: <FaHeadset />,
      color: "#264653",
      link: "https://t.me/SolarX_TeamSupport",
    },
    {
      label: "Deposit+Withdraw (Telegram)",
      icon: <FaMoneyBillWave />,
      color: "#00b4d8",
      link: "https://t.me/SolarX_TeamSupport",
    },
  ];

  return (
    <div className="support-container">
      {/* Header */}
      <div className="support-header">
        <Link to="/setting" className="back-btn">
          <FaArrowLeft />
        </Link>
        <h2>Solar X Service Support</h2>
      </div>

      {/* WhatsApp Section */}
      <h3 className="section-title">WhatsApp Team Services</h3>
      <div className="support-grid">
        {services.slice(0, 4).map((s, i) => (
          <a
            key={i}
            href={s.link}
            target="_blank"
            rel="noopener noreferrer"
            className="support-card"
            style={{ background: s.color }}
          >
            <div className="card-icon">{s.icon}</div>
            <p>{s.label}</p>
          </a>
        ))}
      </div>

      {/* Telegram Section */}
      <h3 className="section-title">Telegram Team Services</h3>
      <div className="support-grid">
        {services.slice(4).map((s, i) => (
          <a
            key={i}
            href={s.link}
            target="_blank"
            rel="noopener noreferrer"
            className="support-card"
            style={{ background: s.color }}
          >
            <div className="card-icon">{s.icon}</div>
            <p>{s.label}</p>
          </a>
        ))}
      </div>

      <h2 className="thank-text">THANK YOU</h2>
    </div>
  );
}
