import React, { useEffect, useState } from "react";
import {  Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { db } from "./db";

import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Friends from "./components/Friends";
import Profile from "./components/Profile";

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Restore session on load (cookie or localStorage)
  useEffect(() => {
    (async () => {
      const cookieId = Cookies.get("sessionUserId");
      const storageId = localStorage.getItem("userId");
      const expiry = localStorage.getItem("expiry");

      // If cookie exists, try auto login by cookie
      const idToUse = cookieId || storageId;
      if (!idToUse || !expiry) return;

      if (Date.now() < parseInt(expiry, 10)) {
        const u = await db.users.get(Number(idToUse));
        if (u) setUser(u);
        // extend cookie if present
        if (cookieId) Cookies.set("sessionUserId", idToUse, { expires: 1 / 288 });
      } else {
        // session expired
        localStorage.removeItem("userId");
        localStorage.removeItem("expiry");
        Cookies.remove("sessionUserId");
      }
    })();
  }, []);

  // central logout helper
  function handleLogout() {
    setUser(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("expiry");
    Cookies.remove("sessionUserId");
    navigate("/login");
  }

  return (
  
    <div style={styles.app}>
      <nav style={styles.nav}>
     
        <div style={styles.links}>
          <Link to="/" style={styles.link}>Home</Link>
          {user ? (
            <>
              <Link to="/friends" style={styles.link}>Friends</Link>
              <Link to="/profile" style={styles.link}>Profile</Link>
              <button style={styles.btn} onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/signup" style={styles.link}>Signup</Link>
            </>
          )}
        </div>
      </nav>

      <main style={styles.main}>
        <Routes>
          <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/friends" element={user ? <Friends user={user} /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/login" />} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </main>
    </div>
  );
}

const styles = {
  app: { fontFamily: "Arial, sans-serif", minHeight: "100vh", background: "#f5f7fb" },
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px", background: "#1976d2", color: "#fff" },
  brand: { color: "#fff", textDecoration: "none", fontWeight: "bold", fontSize: 18 },
  links: { display: "flex", gap: 12, alignItems: "center" },
  link: { color: "#fff", textDecoration: "none" },
  btn: { background: "#f44336", color: "#fff", border: "none", padding: "6px 10px", borderRadius: 4, cursor: "pointer" },
  main: { padding: 20, maxWidth: 900, margin: "20px auto" }
};


