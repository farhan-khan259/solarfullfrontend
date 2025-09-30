// src/admin/pages/CMS/Pages.jsx
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { useMockStore } from "../../store";
import "../../styles/admin.css";
import "../../styles/userlist.css";

export default function Pages() {
  const { savePage } = useMockStore();
  const [slug, setSlug] = useState("about");
  const [title, setTitle] = useState("About");
  const [content, setContent] = useState("About content");

  const handleSave = () => {
    if (!slug.trim() || !title.trim() || !content.trim()) {
      alert("Please fill out all fields before saving.");
      return;
    }
    if (savePage) {
      savePage({ slug, title, content });
      alert(`Page "${title}" saved successfully!`);
    } else {
      alert("Save function not implemented yet.");
    }
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          <h2>Pages</h2>
          <div className="card-box">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 12,
              }}
            >
              <div>
                <label>Slug</label>
                <input
                  className="userlist-search"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="Unique page identifier"
                />
              </div>
              <div>
                <label>Title</label>
                <input
                  className="userlist-search"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Page title"
                />
              </div>
              <div>
                <label>Content</label>
                <textarea
                  style={{ width: "100%", minHeight: 150, padding: 8 }}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write page content here..."
                />
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <button className="action-btn" onClick={handleSave}>
                Save Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
