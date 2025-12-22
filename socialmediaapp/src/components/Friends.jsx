import React, { useEffect, useState } from "react";
import { db } from "../db";

export default function Friends({ user }) {
  const [allUsers, setAllUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => { loadAll(); }, [user]);

  async function loadAll() {
    const users = await db.users.toArray();
    const allReq = await db.friendRequests.toArray();

    setAllUsers(users.filter(u => u.id !== user.id));
    setRequests(allReq.filter(r => r.receiverId === user.id && r.status === "pending"));

    const accepted = allReq.filter(r => r.status === "accepted" && (r.senderId === user.id || r.receiverId === user.id));
    const myFriendIds = accepted.map(r => (r.senderId === user.id ? r.receiverId : r.senderId));
    setFriends(users.filter(u => myFriendIds.includes(u.id)));
  }

  async function sendRequest(receiverId) {
    if (receiverId === user.id) return;
    const existing = await db.friendRequests.where({ senderId: user.id, receiverId }).first();
    if (existing) return alert("Request already exists or handled.");
    await db.friendRequests.add({ senderId: user.id, receiverId, status: "pending" });
    alert("Request sent");
    await loadAll();
  }

  async function acceptRequest(id) {
    await db.friendRequests.update(id, { status: "accepted" });
    await loadAll();
  }

  async function rejectRequest(id) {
    await db.friendRequests.update(id, { status: "rejected" });
    await loadAll();
  }

  return (
    <div>
      <h2>Friends</h2>

      <div style={styles.block}>
        <h3>My Friends</h3>
        {friends.length === 0 ? <p>No friends yet.</p> : friends.map(f => <div key={f.id}>{f.name} ({f.email})</div>)}
      </div>

      <div style={styles.block}>
        <h3>Requests Received</h3>
        {requests.length === 0 ? <p>No pending requests.</p> : requests.map(r => {
          const sender = allUsers.concat([]).find(u => u.id === r.senderId);
          return (
            <div key={r.id} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
              <div>{sender?.name || "Unknown"}</div>
              <button onClick={() => acceptRequest(r.id)} style={styles.btnSmall}>Accept</button>
              <button onClick={() => rejectRequest(r.id)} style={styles.btnSmallRed}>Reject</button>
            </div>
          );
        })}
      </div>

      <div style={styles.block}>
        <h3>All Users</h3>
        {allUsers.map(u => (
          <div key={u.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div>{u.name} ({u.email})</div>
            <div>
              <button onClick={() => sendRequest(u.id)} style={styles.btnSmall}>Add Friend</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  block: { background: "#fff", padding: 12, borderRadius: 8, marginBottom: 12, border: "1px solid #eee" },
  btnSmall: { background: "#1976d2", color: "#fff", border: "none", padding: "6px 10px", borderRadius: 6, cursor: "pointer" },
  btnSmallRed: { background: "#f44336", color: "#fff", border: "none", padding: "6px 10px", borderRadius: 6, cursor: "pointer", marginLeft: 6 }
};

