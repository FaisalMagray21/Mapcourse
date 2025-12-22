import React, { useEffect, useState } from "react";
import { db } from "../db";

export default function Home({ user }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadFeed();
    // eslint-disable-next-line
  }, [user]);

  async function loadFeed() {
    if (!user) return;
    // get accepted friend requests
    const accepted = await db.friendRequests.where("status").equals("accepted").toArray();
    const friendIds = accepted
      .filter((r) => r.senderId === user.id || r.receiverId === user.id)
      .map((r) => (r.senderId === user.id ? r.receiverId : r.senderId));

    // allowed: mine + friends
    const allowed = [user.id, ...friendIds];

    // fetch all posts and filter
    const all = await db.posts.toArray();
    const visible = all
      .filter((p) => allowed.includes(p.userId))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // attach author info
    const allUsers = await db.users.toArray();
    const withUser = visible.map((p) => ({ ...p, author: allUsers.find((u) => u.id === p.userId) }));
    setPosts(withUser);
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  }

  async function handlePost(e) {
    e.preventDefault();
    if (!content.trim() && !image) return alert("Write something or add an image");
    await db.posts.add({ userId: user.id, content: content.trim(), image: image || null, createdAt: new Date().toISOString() });
    setContent("");
    setImage("");
    await loadFeed();
  }

  return (
    <div>
      <h2>News Feed</h2>

      <div style={styles.card}>
        <form onSubmit={handlePost}>
          <textarea style={styles.textarea} placeholder="What's on your mind?" value={content} onChange={(e) => setContent(e.target.value)} />
          <div style={{ marginTop: 8 }}>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          {image && <img src={image} alt="preview" style={styles.preview} />}
          <div style={{ marginTop: 8 }}>
            <button style={styles.btn} type="submit">Post</button>
          </div>
        </form>
      </div>

      <div style={{ marginTop: 20 }}>
        {posts.length === 0 ? <p>No posts yet.</p> : posts.map((p) => (
          <div key={p.id} style={styles.postCard}>
            <div style={styles.postHeader}>
              <strong>{p.author?.name || "Unknown"}</strong>
              <small style={{ color: "#666" }}>{new Date(p.createdAt).toLocaleString()}</small>
            </div>
            <p>{p.content}</p>
            {p.image && <img src={p.image} alt="post" style={styles.postImage} />}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  card: { background: "#fff", padding: 12, borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
  textarea: { width: "100%", minHeight: 60, padding: 8, borderRadius: 6, border: "1px solid #ddd", resize: "vertical" },
  preview: { width: 120, height: 120, objectFit: "cover", marginTop: 8, borderRadius: 6 },
  btn: { background: "#1976d2", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 6, cursor: "pointer" },
  postCard: { background: "#fff", padding: 12, borderRadius: 8, border: "1px solid #eee", marginBottom: 12 },
  postHeader: { display: "flex", justifyContent: "space-between", marginBottom: 8 },
  postImage: { width: "100%", maxHeight: 300, objectFit: "cover", borderRadius: 8 }
};


