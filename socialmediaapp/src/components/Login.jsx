import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { db } from "../db";

export default function Login({ setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const user = await db.users.where("email").equals(form.email).first();
    if (!user || user.password !== form.password) return alert("Invalid credentials");

    // set session: localStorage expiry for 5 mins
    const expiry = Date.now() + 5 * 60 * 1000;
    localStorage.setItem("userId", user.id);
    localStorage.setItem("expiry", expiry.toString());

    // cookie if remember
    if (remember) {
      // cookie expiry: 1 day for remember; otherwise we can set 5min cookie too
      Cookies.set("sessionUserId", user.id, { expires: 1 });
    } else {
      // set a short cookie for auto-login during 5min session (optional)
      Cookies.set("sessionUserId", user.id, { expires: 1 / 288 }); // 1/288 day = 5 minutes
    }

    setUser(user);
    navigate("/");
  }

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input style={styles.input} placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input style={styles.input} type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)} /> Remember Me
        </label>
        <div>
          <button style={styles.btn} type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: { maxWidth: 420, margin: "auto", background: "#fff", padding: 16, borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.1)" },
  form: { display: "flex", flexDirection: "column", gap: 10 },
  input: { padding: 8, borderRadius: 4, border: "1px solid #ddd" },
  btn: { background: "#1976d2", color: "#fff", padding: 8, border: "none", borderRadius: 4 }
};
