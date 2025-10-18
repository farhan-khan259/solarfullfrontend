import { FaArrowLeft, FaHeadset } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Support.css";

export default function Support() {
  return (
    <div className="support-container">
      {/* Header */}
      <header className="support-header">
        <Link to="/setting" className="back-btn">
          <FaArrowLeft />
        </Link>
        <h2>Solar X Service Support</h2>
      </header>

      {/* Green Urdu Message */}
      <div className="urdu-green-box">
        سولر ایکس میں روزانہ کی نیو اپڈیٹس جاننے کے لیے سولر ایکس کا آفیشل گروپ
        لازمی جوائن کریں
      </div>

      {/* Cards Section */}
      <div className="support-cards">
        {/* Left Red Card */}
        <a
          href="https://chat.whatsapp.com/E3V0WcJKMru954hzfPIGMy?mode=wwt"
          target="_blank"
          rel="noopener noreferrer"
          className="support-card red-card"
        >
          <h3>
            SPECIAL
            <br />
            OFFER
          </h3>
          <p>روزانہ کی نیو اپڈیٹس جاننے کے لیے آفیشل گروپ لازمی جوائن کریں</p>
        </a>

        {/* Right Orange Card */}
        <a
          href="https://wa.me/923257765123?text=Hello%20Solar%20X%20Support%20Team"
          target="_blank"
          rel="noopener noreferrer"
          className="support-card orange-card"
        >
          <FaHeadset className="support-icon" />
          <p>اگر آپ کو کوئی بھی مسئلہ ہے تو کسٹمر سروس سے رابطہ کریں</p>
        </a>
      </div>
    </div>
  );
}
