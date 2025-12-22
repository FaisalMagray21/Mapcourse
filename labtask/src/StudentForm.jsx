import React, { useState } from "react";
import { db } from "./db";

export default function StudentForm() {
  const [name, setName] = useState("");
  const [section, setSection] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [avgCgpa, setAvgCgpa] = useState(null);
  const [avgNameLen, setAvgNameLen] = useState(null);

  const saveStudent = async () => {
    if (!name || !section || !cgpa) return alert("Please fill all fields");

    await db.students.add({
      name,
      section,
      cgpa: parseFloat(cgpa)
    });

    setName("");
    setSection("");
    setCgpa("");

    alert("Student Saved Successfully!");
  };

  const viewAverage = async () => {
    const all = await db.students.toArray();
    if (all.length === 0) {
      alert("No students stored yet!");
      return;
    }

    const avgCgpaCalc =
      all.reduce((acc, s) => acc + s.cgpa, 0) / all.length;

    const avgNameCalc =
      all.reduce((acc, s) => acc + s.name.length, 0) / all.length;

    setAvgCgpa(avgCgpaCalc.toFixed(2));
    setAvgNameLen(avgNameCalc.toFixed(2));
  };

  return (
    <div style={{ width: "350px", margin: "40px auto", padding: "20px",
                  border: "1px solid #ccc", borderRadius: "10px" }}>

      <h2>Student Form</h2>

      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />

      <input
        type="text"
        placeholder="Section"
        value={section}
        onChange={(e) => setSection(e.target.value)}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />

      <input
        type="number"
        placeholder="CGPA"
        value={cgpa}
        onChange={(e) => setCgpa(e.target.value)}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />

      <button
        onClick={saveStudent}
        style={{
          width: "100%",
          padding: "10px",
          background: "green",
          color: "white",
          marginTop: "15px",
          borderRadius: "5px",
          border: "none"
        }}
      >
        Save
      </button>

      <button
        onClick={viewAverage}
        style={{
          width: "100%",
          padding: "10px",
          background: "blue",
          color: "white",
          marginTop: "10px",
          borderRadius: "5px",
          border: "none"
        }}
      >
        View Average
      </button>

      {avgCgpa !== null && (
        <div style={{ marginTop: "20px" }}>
          <h4>Avg CGPA: {avgCgpa}</h4>
          <h4>Avg Name Length: {avgNameLen}</h4>
        </div>
      )}
    </div>
  );
}
