// src/admin/pages/UserList.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaSync, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../styles/admin.css";
import "../../styles/userlist.css";
import UserProfileModal from "./UserProfileModal";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://be.solarx0.com/api/getalluser");

      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        setError("Failed to fetch users");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Error loading user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleView = (user) => setSelectedUser(user);
  const handleCloseModal = () => setSelectedUser(null);

  const handleSuspendToggle = async (id) => {
    try {
      const response = await axios.put(
        `https://be.solarx0.com/api/admin/users/${id}/toggle-status`
      );

      if (response.data.success) {
        // Update local state
        setUsers((prev) =>
          prev.map((u) =>
            u._id === id
              ? { ...u, status: u.status === "active" ? "suspended" : "active" }
              : u
          )
        );

        // Update modal if open
        setSelectedUser((prev) =>
          prev && prev._id === id
            ? {
                ...prev,
                status: prev.status === "active" ? "suspended" : "active",
              }
            : prev
        );
      }
    } catch (err) {
      console.error("Error toggling user status:", err);
      setError("Failed to update user status");
    }
  };

  const handleDeleteUser = async (id) => {
    console.log(id);
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await axios.delete("https://be.solarx0.com/api/delete", {
        data: { userId: id }, // ✅ body must be wrapped in `data`
      });

      if (response.data.success) {
        setUsers((prev) => prev.filter((u) => u._id !== id));
        if (selectedUser && selectedUser._id === id) {
          setSelectedUser(null);
        }
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user");
    }
  };

  const refreshUsers = () => {
    fetchUsers();
  };

  if (loading) {
    return (
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-main">
          <Topbar />
          <div className="admin-content">
            <h2>Users</h2>
            <div
              className="card-box"
              style={{ padding: 12, textAlign: "center" }}
            >
              <div className="loading">Loading users...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-main">
          <Topbar />
          <div className="admin-content">
            <h2>Users</h2>
            <div
              className="card-box"
              style={{ padding: 12, textAlign: "center" }}
            >
              <div className="error">{error}</div>
              <button onClick={refreshUsers} className="refresh-btn">
                <FaSync /> Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <div className="page-header">
            <h2>Users</h2>
            <button onClick={refreshUsers} className="refresh-btn">
              <FaSync /> Refresh
            </button>
          </div>

          <div className="card-box" style={{ padding: 12 }}>
            {error && <div className="error-message">{error}</div>}

            <table className="userlist-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td data-label="ID">{index + 1}</td>
                    <td data-label="Name">
                      {user.fullName || user.name || "N/A"}
                    </td>
                    <td data-label="Email">{user.email}</td>
                    <td data-label="Phone">
                      {user.phoneNumber || user.whatsappNumber || "N/A"}
                    </td>
                    <td data-label="Role">
                      <span
                        className={`role-badge ${
                          user.role === "admin" ? "admin" : "user"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>
                    <td data-label="Status">
                      <span
                        className={`status-badge ${
                          user.status === "active" ? "active" : "suspended"
                        }`}
                      >
                        {user.status || "active"}
                      </span>
                    </td>
                    <td data-label="Joined">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td data-label="Actions">
                      <button
                        className="action-btn view"
                        onClick={() => handleView(user)}
                        title="View Details"
                      >
                        <FaEye />
                      </button>

                      <Link to="/admin/userdetails" state={{ user: user }}>
                        <button className="action-btn edit" title="Edit User">
                          <FaEdit />
                        </button>
                      </Link>

                      <button
                        className="action-btn delete"
                        onClick={() => handleDeleteUser(user._id)}
                        title="Delete User"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {users.length === 0 && (
              <p style={{ textAlign: "center", marginTop: 10 }}>
                No users found
              </p>
            )}
          </div>

          {selectedUser && (
            <UserProfileModal
              user={selectedUser}
              onClose={handleCloseModal}
              onSuspendToggle={handleSuspendToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
}
