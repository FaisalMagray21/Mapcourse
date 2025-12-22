import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../db";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return alert("Fill all fields");
    const exists = await db.users.where("email").equals(form.email).first();
    if (exists) return alert("Email already registered");
    await db.users.add({ ...form, image: null });
    alert("Account created. Please login.");
    navigate("/login");
  }

  return (
    <div style={styles.container}>
      <h2>Signup</h2>
      <form onSubmit={handleSignup} style={styles.form}>
        <input style={styles.input} placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input style={styles.input} placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input style={styles.input} type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button style={styles.btn} type="submit">Create Account</button>
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


