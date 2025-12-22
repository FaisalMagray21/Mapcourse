import React, { useState } from "react";
import { db } from "../db";
import { useNavigate } from "react-router-dom";

export default function Login({ setLoggedInUser }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("⚠️ Enter both email and password.");
      return;
    }

    const user = await db.users.where("email").equals(formData.email).first();

    if (!user) {
      setError("❌ User not found!");
      return;
    }

    if (user.password !== formData.password) {
      setError("❌ Wrong password!");
      return;
    }

    // ✅ Set logged in user in App state
    setLoggedInUser(user);
    setSuccess(`Welcome ${user.fullname}! You are ${user.type}.`);

    // ⭐ Redirect based on role after 1 second
    setTimeout(() => {
      if (user.type === "teacher") {
        navigate("/teacher");
      } else if (user.type === "admin") {
        navigate("/admin");
      } else {
        navigate("/student-dashboard");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-emerald-300 flex flex-col items-center justify-center px-4 py-10">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-green-700">Login</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>
        )}

        {success && (
          <div className="bg-green-100 text-green-700 p-2 rounded">{success}</div>
        )}

        <div>
          <label className="font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full mt-1 p-2 border rounded"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="w-full mt-1 p-2 border rounded"
            onChange={handleChange}
          />
        </div>

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
