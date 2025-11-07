import React, { useState, useEffect } from "react";
import { db } from "../db"; // import the Dexie database

export default function Signup() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "student",
    contact: "",
    address: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [records, setRecords] = useState([]);

  // Load saved users when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await db.users.toArray();
      setRecords(allUsers);
    };
    fetchUsers();
  }, []);

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
        password:formData.password,
        type: formData.type,
        contact: formData.contact,
        address: formData.address,
      };

      // ✅ Save data into Dexie
      await db.users.add(newRecord);

      // ✅ Fetch updated data
      const updatedUsers = await db.users.toArray();
      setRecords(updatedUsers);
      setSuccess("Signup Successful and saved to Dexie!");

      // Reset form
      setFormData({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        type: "student",
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
          Signup Form
        </h2>

        {success && <div className="text-green-600 font-semibold text-center">{success}</div>}

        {/* Full Name */}
        <div>
          <label className="block font-medium text-sm sm:text-base">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300 text-sm sm:text-base"
          />
          {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium text-sm sm:text-base">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300 text-sm sm:text-base"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium text-sm sm:text-base">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300 text-sm sm:text-base"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block font-medium text-sm sm:text-base">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300 text-sm sm:text-base"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>

        {/* Type */}
        <div>
          <label className="block font-medium text-sm sm:text-base">User Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300 text-sm sm:text-base"
          >
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>

        {/* Contact */}
        <div>
          <label className="block font-medium text-sm sm:text-base">Contact</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300 text-sm sm:text-base"
          />
          {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium text-sm sm:text-base">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300 text-sm sm:text-base"
          ></textarea>
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        {/* Checkbox */}
        <div className="flex items-center space-x-2 text-sm sm:text-base">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-500"
          />
          <label>I agree to the terms and conditions</label>
        </div>
        {errors.agree && <p className="text-red-500 text-sm">{errors.agree}</p>}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold transition duration-300 text-sm sm:text-base"
        >
          Signup
        </button>
      </form>

      {/* Display saved users */}

    </div>
  );
}
