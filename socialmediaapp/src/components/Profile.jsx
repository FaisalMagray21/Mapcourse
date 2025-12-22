import React, { useEffect, useState } from "react";
import { db } from "../db";
import Cookies from "js-cookie";

export default function Profile({ user, setUser }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [imagePreview, setImagePreview] = useState(user?.image || "");
  const [posts, setPosts] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadMyPosts();
    setName(user?.name || "");
    setImagePreview(user?.image || "");
    // eslint-disable-next-line
  }, [user]);

  async function loadMyPosts() {
    if (!user) return;
    const myPosts = await db.posts.where("userId").equals(user.id).toArray();
    myPosts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    setPosts(myPosts);
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  }

  async function saveProfile() {
    if (!name.trim()) return alert("Name required");
    setSaving(true);
    const updatedFields = { name: name.trim(), image: imagePreview || null };
    await db.users.update(user.id, updatedFields);
    const updatedUser = await db.users.get(user.id);
    setUser(updatedUser);
    // extend session
    if (Cookies.get("sessionUserId")) Cookies.set("sessionUserId", updatedUser.id, { expires: 1 / 288 });
    localStorage.setItem("userId", updatedUser.id);
    localStorage.setItem("expiry", Date.now() + 5 * 60 * 1000);
    setSaving(false);
    setEditing(false);
    alert("Profile saved");
    await loadMyPosts();
  }

  async function deletePost(id) {
    if (!window.confirm("Delete this post?")) return;
    await db.posts.delete(id);
    await loadMyPosts();
  }

  return (
    <div>
      <h2>My Profile</h2>
      <div style={styles.card}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <img src={imagePreview || defaultAvatar} alt="profile" style={styles.avatar} />
          <div style={{ flex: 1 }}>
            {editing ? (
              <>
                <input style={styles.input} value={name} onChange={(e) => setName(e.target.value)} />
                <div style={{ marginTop: 8 }}>
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                <div style={{ marginTop: 8 }}>
                  <button onClick={saveProfile} style={styles.btnSmall} disabled={saving}>{saving ? "Saving..." : "Save"}</button>
                  <button onClick={() => { setEditing(false); setName(user.name); setImagePreview(user.image); }} style={styles.btnCancel}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h3 style={{ margin: 0 }}>{user.name}</h3>
                <p style={{ marginTop: 6 }}>{user.email}</p>
                <button onClick={() => setEditing(true)} style={styles.btnSmall}>Edit Profile</button>
              </>
            )}
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: 16 }}>My Posts</h3>
      {posts.length === 0 ? <p>No posts yet.</p> : posts.map(p => (
        <div key={p.id} style={styles.postCard}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <small style={{ color: "#666" }}>{new Date(p.createdAt).toLocaleString()}</small>
            <button onClick={() => deletePost(p.id)} style={styles.btnDanger}>Delete</button>
          </div>
          <p>{p.content}</p>
          {p.image && <img src={p.image} alt="post" style={styles.postImage} />}
        </div>
      ))}
    </div>
  );
}

const defaultAvatar =
  "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 24 24'><rect width='100%' height='100%' fill='%23ddd'/><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.33 0-6 1.67-6 4v1h12v-1c0-2.33-2.67-4-6-4z' fill='%23888'/></svg>`);

const styles = {
  card: { background: "#fff", padding: 12, borderRadius: 8, border: "1px solid #eee" },
  avatar: { width: 100, height: 100, objectFit: "cover", borderRadius: 8 },
  input: { padding: 8, borderRadius: 4, border: "1px solid #ddd", width: "100%" },
  btnSmall: { background: "#1976d2", color: "#fff", border: "none", padding: "6px 10px", borderRadius: 6, cursor: "pointer" },
  btnCancel: { background: "#9e9e9e", color: "#fff", border: "none", padding: "6px 10px", borderRadius: 6, cursor: "pointer", marginLeft: 8 },
  postCard: { background: "#fff", padding: 12, borderRadius: 8, border: "1px solid #eee", marginBottom: 12 },
  postImage: { width: "100%", maxHeight: 300, objectFit: "cover", borderRadius: 8, marginTop: 8 },
  btnDanger: { background: "#f44336", color: "#fff", border: "none", padding: "6px 10px", borderRadius: 6, cursor: "pointer" }
};


