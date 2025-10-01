import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/userdetails.css";

export default function UserDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user: initialUser } = location.state || {};

  const [user, setUser] = useState(initialUser || {}); // Initialize with initialUser if available
  const [loading, setLoading] = useState(!initialUser); // Set loading to true if we need to fetch user data

  // If user data wasn't passed via state, fetch it from API using ID from URL
  useEffect(() => {
    const fetchUserData = async () => {
      if (!initialUser) {
        try {
          setLoading(true);
          // Extract user ID from URL if needed
          const pathParts = location.pathname.split("/");
          const userId = pathParts[pathParts.length - 1];

          if (userId && userId !== "userdetails") {
            const response = await axios.get(
              `https://be.solarx0.com/api/admin/users/${userId}`
            );
            if (response.data.success) {
              setUser(response.data.user);
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [initialUser, location.pathname]);

  // Fetch team data when user ID is available

  console.log(user._id);
  // Balance Add
  const handleAddBalance = async () => {
    const amount = parseInt(prompt("Enter amount to add:"), 10);
    if (!isNaN(amount) && amount > 0) {
      try {
        const response = await axios.post(
          `https://be.solarx0.com/api/addBalanceByAdmin`,
          {
            userId: user._id,
            balance: amount,
          }
        );

        if (response.data.success) {
          setUser({ ...user, balance: user.balance + amount });
          alert(`PKR ${amount} added to balance!`);
        }
      } catch (error) {
        console.error("Error adding balance:", error);
        alert("Failed to add balance");
      }
    }
  };

  // Balance Subtract
  const handleSubtractBalance = async () => {
    const amount = parseInt(prompt("Enter amount to subtract:"), 10);
    if (!isNaN(amount) && amount > 0) {
      try {
        const response = await axios.post(
          `https://be.solarx0.com/api/addSubtractByAdmin`,
          {
            userId: user._id,
            balance: amount,
          }
        );

        if (response.data.success) {
          setUser({ ...user, balance: user.balance + amount });
          alert(`PKR ${amount} added to balance!`);
        }
      } catch (error) {
        console.error("Error adding balance:", error);
        alert("Failed to add balance");
      }
    } else {
      alert("Invalid amount.");
    }
  };

  // Delete Account
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      try {
        const response = await axios.delete(
          `https://be.solarx0.com/api/delete`,
          { userId: user._id }
        );

        if (response.data.success) {
          alert("User account deleted successfully!");
          navigate("/admin/users"); // Redirect to users list
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user account");
      }
    }
  };

  // Login to Account (Admin Impersonation)
  const handleLogin = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    console.log("adsfas");
    try {
      const response = await axios.post(
        `https://be.solarx0.com/api/adminLoginUserAccount`,
        {
          userId: user._id,
        }
      );
      console.log(response);

      if (response.status === 200) {
        alert(`Logging in as ${user.fullName}...`);
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/dashboard"; // Redirect to user dashboard
      }
    } catch (error) {
      console.error("Error impersonating user:", error);
      alert("Failed to login as user");
    }
  };

  console.log(user);
  // Delete Plan
  const handleDeletePlan = async () => {
    if (window.confirm("Are you sure you want to delete this user's plan?")) {
      try {
        const response = await axios.post(
          `https://be.solarx0.com/api/admindeleteplainuser`,
          { userId: user._id }
        );

        if (response.data.success) {
          alert("Plan Deleted Successfully!");
        }
        if (response.status === 201) {
          alert("No plan found for this user");
        }
      } catch (error) {
        console.error("Error deleting plan:", error);
        alert("Failed to delete plan");
      }
    }
  };

  // Ban/Unban User

  if (loading) {
    return (
      <div className="admin-layout">
        <div className="main-content">
          <div className="userdetails-container">
            <div className="loading">Loading user details...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <div className="main-content">
        <div className="userdetails-container">
          <h2>User Details</h2>

          <div className="user-card">
            <p>
              <strong>User Name:</strong> {user.fullName || user.name || "N/A"}
            </p>
            <p>
              <strong>UID:</strong> {user._id || user.uid || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {user.email || "N/A"}
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              {user.phoneNumber || user.whatsappNumber || "N/A"}
            </p>
            <p>
              <strong>Status:</strong>
              <span className={`status-badge ${user.status || "active"}`}>
                {user.status || "active"}
              </span>
            </p>
            <p>
              <strong>Deposit:</strong> {user.userTotalDeposits || 0} PKR
            </p>
            <p>
              <strong>Withdrawal:</strong> {user.userTotalWithdrawals || 0} PKR
            </p>
            <p>
              <strong>Total Team Members:</strong> {user.teamMembers || 0}
            </p>
            <p>
              <strong>Total Team Commission:</strong> {user.teamCommission || 0}{" "}
              PKR
            </p>
            <p>
              <strong>Current Balance:</strong> {user.userbalance || 0} PKR
            </p>
            <p>
              <strong>Joined Date:</strong>{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <div className="actions">
            <button className="btn green" onClick={handleAddBalance}>
              Add Balance
            </button>
            <button className="btn orange" onClick={handleSubtractBalance}>
              Subtract Balance
            </button>
            <button className="btn red" onClick={handleDelete}>
              Delete Account
            </button>
            <button className="btn blue" onClick={() => handleLogin()}>
              Login to Account
            </button>
            <button className="btn purple" onClick={handleDeletePlan}>
              Delete Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
