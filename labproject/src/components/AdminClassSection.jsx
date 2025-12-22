import React, { useState, useEffect } from "react";
import { db } from "../db";

export default function AdminClassSection() {
  const [className, setClassName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);

  // Load classes & sections at start
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const allClasses = await db.classes.toArray();
    const allSections = await db.sections.toArray();

    setClasses(allClasses);
    setSections(allSections);
  };

  // Add Class
  const addClass = async () => {
    if (!className) return alert("Enter class name");

    await db.classes.add({ classname: className });

    alert("Class Added!");
    setClassName("");
    loadData();
  };

  // Add Section
  const addSection = async () => {
    if (!sectionName || !selectedClass)
      return alert("Select class & enter section");

    await db.sections.add({
      classId: parseInt(selectedClass),
      sectionName
    });

    alert("Section Added!");
    setSectionName("");
    loadData();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto space-y-6">

        <h2 className="text-2xl font-bold text-indigo-600 text-center">
          Admin – Add Classes & Sections
        </h2>

        {/* Add Class */}
        <div>
          <label className="block font-medium">Add Class:</label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-md"
            placeholder="e.g., Class 1, Class 2, Class 10"
          />
          <button
            onClick={addClass}
            className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md w-full"
          >
            Add Class
          </button>
        </div>

        {/* Add Section */}
        <div>
          <label className="block font-medium">Select Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-md"
          >
            <option value="">Choose Class</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.classname}
              </option>
            ))}
          </select>

          <label className="block mt-3 font-medium">Add Section:</label>
          <input
            type="text"
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-md"
            placeholder="e.g., A, B, C"
          />
          <button
            onClick={addSection}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md w-full"
          >
            Add Section
          </button>
        </div>

        {/* List of Classes */}
        <div>
          <h3 className="text-lg font-semibold mt-4">All Classes</h3>
          {classes.map((c) => (
            <div key={c.id} className="p-2 border rounded mt-2">
              <strong>{c.classname}</strong>

              {/* Show sections of this class */}
              <div className="ml-3 text-sm text-gray-600">
                Sections:{" "}
                {sections
                  .filter((s) => s.classId === c.id)
                  .map((s) => s.sectionName)
                  .join(", ")}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
