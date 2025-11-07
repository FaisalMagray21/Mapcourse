import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import NotionDeveloper from "./components/NotionDeveloper";

const App = () => {
  return (
    <Router>
      {/* 🌟 Simple Navigation Bar */}
      <nav className="bg-green-600 text-white p-4 flex justify-center gap-6 text-lg font-semibold">
        <Link to="/signup" className="hover:underline">Signup</Link>
        <Link to="/login" className="hover:underline">Login</Link>
      </nav>

      {/* 🌟 Define Routes */}
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
