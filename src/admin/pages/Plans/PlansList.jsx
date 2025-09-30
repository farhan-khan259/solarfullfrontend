// src/admin/pages/Plans/PlansList.jsx
import { useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { useMockStore } from "../../store";
import "../../styles/admin.css";
import "../../styles/userlist.css";

export default function PlansList() {
  const { db, removePlan, editPlan } = useMockStore();
  const [q, setQ] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [currentPlan, setCurrentPlan] = useState(null);

  const filteredPlans = useMemo(
    () =>
      db.plans.filter((plan) =>
        JSON.stringify(plan).toLowerCase().includes(q.toLowerCase())
      ),
    [db.plans, q]
  );

  const openEditModal = (plan) => {
    setCurrentPlan(plan);
    setEditModal(true);
  };

  const handleSave = () => {
    if (currentPlan) editPlan(currentPlan.id, currentPlan);
    setEditModal(false);
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2>Plans List</h2>

          <div style={{ marginBottom: 12 }}>
            <input
              placeholder="Search by name, duration, price..."
              className="userlist-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <table className="userlist-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Duration (days)</th>
                <th>Price (PKR)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map((plan) => (
                <tr key={plan.id}>
                  <td data-label="ID">{plan.id}</td>
                  <td data-label="Name">{plan.name}</td>
                  <td data-label="Duration">{plan.duration || 0}</td>
                  <td data-label="Price">
                    PKR {(plan.price || 0).toLocaleString()}
                  </td>
                  <td data-label="Actions">
                    <button
                      className="action-btn view"
                      onClick={() => openEditModal(plan)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => removePlan(plan.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {editModal && currentPlan && (
            <div className="modal-overlay">
              <div className="modal-box">
                <h3>Edit Plan: {currentPlan.name}</h3>
                <div style={{ margin: "10px 0" }}>
                  <label>Name:</label>
                  <input
                    value={currentPlan.name}
                    onChange={(e) =>
                      setCurrentPlan({ ...currentPlan, name: e.target.value })
                    }
                  />
                </div>
                <div style={{ margin: "10px 0" }}>
                  <label>Duration (days):</label>
                  <input
                    type="number"
                    value={currentPlan.duration || 0}
                    onChange={(e) =>
                      setCurrentPlan({
                        ...currentPlan,
                        duration: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div style={{ margin: "10px 0" }}>
                  <label>Price (PKR):</label>
                  <input
                    type="number"
                    value={currentPlan.price || 0}
                    onChange={(e) =>
                      setCurrentPlan({
                        ...currentPlan,
                        price: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 10,
                  }}
                >
                  <button
                    className="action-btn delete"
                    onClick={() => setEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="action-btn view" onClick={handleSave}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
