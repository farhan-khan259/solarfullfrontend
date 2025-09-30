// src/admin/components/UserProfileModal.jsx
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import "../../styles/userprofilemodal.css";

const UserProfileModal = ({ user, onClose }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation
    setTimeout(() => setAnimate(true), 10);
  }, []);

  const handleClose = () => {
    setAnimate(false);
    setTimeout(onClose, 300); // delay unmount for animation
  };

  return (
    <div className={`modal-overlay ${animate ? "show" : ""}`}>
      <div className={`modal-content ${animate ? "slide-in" : ""}`}>
        <button className="modal-close" onClick={handleClose}>
          <FaTimes />
        </button>
        <h2>User Profile</h2>
        <div className="user-info">
          <p>
            <strong>ID:</strong> {user._id}
          </p>
          <p>
            <strong>Name:</strong> {user.fullName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.whatsappNumber}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Status:</strong> {user.status || "active"}
          </p>
        </div>
        <div className="modal-actions">
          <button className="action-btn" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
