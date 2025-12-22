import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NotionDeveloper from "./components/NotionDeveloper";
import Admin from "./components/Admin";
import AddStudent from "./components/AddStudent";
import Teacher from "./components/Teacher";
import { useState } from "react";
import AssignSection from "./components/AssignSection";
// import ManageClassSection from "./components/ManageClassSection"; // 🔥 New Component
const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null); // ✅ state for logged in user

  return (

    <Router>
      {/* 🌟 Simple Navigation Bar */}
      <nav className="bg-green-600 text-white p-4 flex justify-center gap-6 text-lg font-semibold">
        <Link to="/signup" className="hover:underline">Signup</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        {/* <Link to="/addstudent" className="hover:underline">Add Student</Link>
        <Link to="/managesection" className="hover:underline">Manage Section</Link> 🔥 New Link */}
      </nav>

      {/* 🌟 Define Routes */}
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
<Route
  path="/login"
  element={<Login setLoggedInUser={setLoggedInUser} />}
/>
<Route
  path="/teacher"
  element={<Teacher userEmail={loggedInUser?.email} />}
/>


        {/* ✔ Add Student */}
        <Route path="/addstudent" element={<AddStudent />} />

        {/* ✔ Admin route */}
        <Route path="/admin" element={<Admin />} />

        {/* ✔ NEW Route for Class/Section Management */}
        <Route path="/managesection" element={<AssignSection />} />
      </Routes>
    </Router>
  );
};

export default App;


