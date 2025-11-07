import React, { useState } from "react";
import { db } from "../db"; // import Dexie database

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userType, setUserType] = useState("");
  const [userName, setUserName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setUserType("");
    setUserName("");

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("⚠️ Please enter both email and password.");
      return;
    }

    // ✅ Fetch user from Dexie database
    const user = await db.users.where("email").equals(formData.email).first();

    if (!user) {
      setError("❌ No user found with this email!");
      return;
    }

    // ✅ Check password
    if (user.password !== formData.password) {
      setError("❌ Incorrect password!");
      return;
    }

    // ✅ Successful login
    setUserType(user.type);
    setUserName(user.fullname);
    setSuccess(`✅ Welcome back, ${user.fullname}! You are logged in as ${user.type}.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-emerald-300 flex flex-col items-center justify-center px-4 py-10">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-600">
          Login Form
        </h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 font-semibold text-center rounded-md py-2 px-3">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 text-green-700 font-semibold text-center rounded-md py-2 px-3">
            {success}
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block font-medium text-sm sm:text-base">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300 text-sm sm:text-base"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium text-sm sm:text-base">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300 text-sm sm:text-base"
            placeholder="Enter your password"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition duration-300 text-sm sm:text-base"
        >
          Login
        </button>
      </form>

      {/* Show Welcome Card */}
      {success && (
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 w-full max-w-md text-center">
          <h3 className="text-xl font-bold text-green-600 mb-2">Welcome!</h3>
          <p className="text-gray-700">
            <span className="font-semibold">{userName}</span> logged in as{" "}
            <span className="font-bold capitalize text-green-700">{userType}</span>.
          </p>
        </div>
      )}
    </div>
  );
}
