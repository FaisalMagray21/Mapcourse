import React, { useState } from "react";
import { db } from "../db";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "",          // 👈 now dynamic
    contact: "",
    address: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.fullname.trim()) newErrors.fullname = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email.";

    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm your password.";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    if (!formData.type) newErrors.type = "Select a role (Admin or Teacher).";

    if (!formData.contact.trim()) newErrors.contact = "Contact number is required.";
    else if (!/^\d{10,15}$/.test(formData.contact))
      newErrors.contact = "Enter a valid contact number.";

    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.agree) newErrors.agree = "You must agree to the terms.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (validate()) {
      const newRecord = {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        type: formData.type,       // 👈 now saving dynamic role
        contact: formData.contact,
        address: formData.address,
      };

      await db.users.add(newRecord);
      setSuccess("Signup Successful!");

      // 🔥 Redirect based on role
      if (formData.type === "admin") {
        navigate("/admin");
      } else if (formData.type === "teacher") {
        navigate("/teacher");
      }

      setFormData({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        type: "",
        contact: "",
        address: "",
        agree: false,
      });

      setErrors({});
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 to-blue-300 flex flex-col items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-600">
          Signup (Admin / Teacher)
        </h2>

        {success && <div className="text-green-600 font-semibold text-center">{success}</div>}

        {/* Full Name */}
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.fullname && <p className="text-red-500">{errors.fullname}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
        </div>

        {/* Role Select */}
        <div>
          <label className="block font-medium">Select Role</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Choose Role</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
          </select>
          {errors.type && <p className="text-red-500">{errors.type}</p>}
        </div>

        {/* Contact */}
        <div>
          <label className="block font-medium">Contact</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.contact && <p className="text-red-500">{errors.contact}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.address && <p className="text-red-500">{errors.address}</p>}
        </div>

        {/* Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />
          <label>I agree to the terms</label>
        </div>
        {errors.agree && <p className="text-red-500">{errors.agree}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
