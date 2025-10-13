import { FaArrowLeft, FaHeadset, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Support.css";

export default function Support() {
  const channels = [
    {
      name: "Channel 1 Arslan Khan",
      whatsapp:
        "https://chat.whatsapp.com/FjcgxLqlfzW7HGqvBigxjo?mode=ems_copy_t",
      contact:
        "https://wa.me/923357918372?text=Hello%20Arslan%20Khan%20from%20Solar%20X",
    },
    {
      name: "Channel 2 Sohail Khan",
      whatsapp: "https://t.me/+POADMsqnKTJhNzdk",
      contact: "https://t.me/SolarX_TeamSupport",
    },
  ];

  return (
    <div className="support-page">
      {/* Header */}
      <header className="support-header">
        <Link to="/setting" className="back-btn">
          <FaArrowLeft />
        </Link>
        <h2>Solar X Service Support</h2>
      </header>

      {/* Urdu Info Bar */}
      <div className="urdu-bar">
        سولر ایکس کے اندر 2 طرح کی مینجمنٹ آپ کو دیکھنے کو ملے گی (چینل 1) اور
        (چینل 2)
      </div>

      {/* Channel Sections */}
      {channels.map((channel, index) => (
        <div key={index} className="channel-section">
          <h3 className="channel-title">{channel.name}</h3>
          <div className="channel-grid">
            <a
              href={channel.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="support-card whatsapp-card"
            >
              <FaWhatsapp className="icon" />
              <p>WhatsApp Group</p>
              <span>Join Everyone</span>
            </a>

            <a
              href={channel.contact}
              target="_blank"
              rel="noopener noreferrer"
              className="support-card contact-card"
            >
              <FaHeadset className="icon" />
              <p>Contact me about</p>
              <span>Solar X any issues</span>
            </a>
          </div>
        </div>
      ))}

      {/* Join Official Channel */}
      <a
        href="https://chat.whatsapp.com/FjcgxLqlfzW7HGqvBigxjo?mode=ems_copy_t"
        target="_blank"
        rel="noopener noreferrer"
        className="join-btn"
      >
        Join the official channel of Solar X
      </a>
    </div>
  );
}
