import React, { useState, useEffect } from "react"; 
import { db } from "../db";
import AddStudent from "./AddStudent";
import Signup from "./Signup";
import AssignSection from "./AssignSection";

import AdminClassSection from "./AdminClassSection";

// 👇 New Component Placeholder (You will create this file)

const Admin = () => {
  const [view, setView] = useState("dashboard");
  const [students, setStudents] = useState({});

  const fetchStudents = async () => {
    const allStudents = await db.students.toArray();
    const grouped = {};
    allStudents.forEach((student) => {
      const cls = student.classs;
      const sec = student.section;
      if (!grouped[cls]) grouped[cls] = {};
      if (!grouped[cls][sec]) grouped[cls][sec] = [];
      grouped[cls][sec].push(student);
    });
    setStudents(grouped);
  };

  useEffect(() => {
    if (view === "showStudents") {
      fetchStudents();
    }
  }, [view]);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Admin Dashboard
      </h2>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setView("addStudent")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add Student
        </button>

        <button
          onClick={() => setView("signup")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Signup
        </button>

        <button
          onClick={() => setView("showStudents")}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Show Students
        </button>

        <button
          onClick={() => setView("classSection")}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Add Section
        </button>

        {/* ⭐ NEW Assign Section Button */}
        <button
          onClick={() => setView("assignSection")}
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
        >
          Assign Section
        </button>
      </div>

      {/* Conditional Rendering */}
      <div>
        {view === "addStudent" && <AddStudent />}
        {view === "signup" && <Signup />}
        {view === "classSection" && <AdminClassSection />}

        {/* ⭐ NEW View */}
        {view === "assignSection" && <AssignSection />}

        {view === "showStudents" && (
          <div>
            {Object.keys(students)
              .sort((a, b) => a - b)
              .map((cls) => (
                <div key={cls} className="mb-8">
                  <h3 className="text-2xl font-semibold mb-3 text-indigo-500">
                    Class {cls}
                  </h3>

                  {Object.keys(students[cls])
                    .sort()
                    .map((sec) => (
                      <div key={sec} className="mb-4">
                        <h4 className="text-xl font-medium mb-2 text-indigo-700">
                          Section {sec}
                        </h4>

                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mb-4">
                            <thead className="bg-indigo-600 text-white">
                              <tr>
                                <th className="py-3 px-4 text-left">ID</th>
                                <th className="py-3 px-4 text-left">Reg No</th>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Father</th>
                                <th className="py-3 px-4 text-left">Contact</th>
                                <th className="py-3 px-4 text-left">Image</th>
                              </tr>
                            </thead>

                            <tbody>
                              {students[cls][sec].map((student) => (
                                <tr
                                  key={student.id}
                                  className="border-b hover:bg-gray-100"
                                >
                                  <td className="py-2 px-4">{student.id}</td>
                                  <td className="py-2 px-4">{student.regno}</td>
                                  <td className="py-2 px-4">{student.sname}</td>
                                  <td className="py-2 px-4">{student.father}</td>
                                  <td className="py-2 px-4">{student.contact}</td>
                                  <td className="py-2 px-4">
                                    {student.image ? (
                                      <img
                                        src={student.image}
                                        alt={student.sname}
                                        className="h-16 w-16 object-cover rounded"
                                      />
                                    ) : (
                                      "No Image"
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
