import React, { useState, useEffect } from "react";
import { db } from "../db";

const subjectsList = [
  "Math",
  "English",
  "Science",
  "Computer",
  "Urdu",
  "Islamiat",
  "History",
  "Geography",
];

const AssignSection = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);

  const [formData, setFormData] = useState({
    teacherEmail: "",
    classId: "",
    sectionId: "",
    subject: "",
  });

  const [success, setSuccess] = useState("");

  // Load teachers (only teacher role)
  const loadTeachers = async () => {
    const t = await db.users.where("type").equals("teacher").toArray();
    setTeachers(t);
  };

  // Load class list
  const loadClasses = async () => {
    const c = await db.classes.toArray();
    setClasses(c);
  };

  // Load sections based on classId
  const loadSections = async (classId) => {
    const sec = await db.sections.where("classId").equals(Number(classId)).toArray();
    setSections(sec);
  };

  useEffect(() => {
    loadTeachers();
    loadClasses();
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "classId") {
      setFormData({
        ...formData,
        classId: value,
        sectionId: "",
      });
      loadSections(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (!formData.teacherEmail || !formData.classId || !formData.sectionId || !formData.subject) {
      alert("Please fill all fields");
      return;
    }

    await db.assignedSections.add(formData);

    setSuccess("Section assigned successfully!");

    setFormData({
      teacherEmail: "",
      classId: "",
      sectionId: "",
      subject: "",
    });
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
      <h2 className="text-3xl font-bold text-indigo-600 mb-5 text-center">
        Assign Section to Teacher
      </h2>

      {success && (
        <p className="text-green-600 font-semibold text-center mb-4">{success}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Teacher Email */}
        <div>
          <label className="block font-medium mb-1">Teacher Email</label>
          <select
            name="teacherEmail"
            value={formData.teacherEmail}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Teacher --</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.email}>
                {t.fullname} – {t.email}
              </option>
            ))}
          </select>
        </div>

        {/* Class Dropdown */}
        <div>
          <label className="block font-medium mb-1">Class</label>
          <select
            name="classId"
            value={formData.classId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Class --</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.classname}
              </option>
            ))}
          </select>
        </div>

        {/* Section Dropdown */}
        <div>
          <label className="block font-medium mb-1">Section</label>
          <select
            name="sectionId"
            value={formData.sectionId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Section --</option>
            {sections.map((sec) => (
              <option key={sec.id} value={sec.id}>
                {sec.sectionName}
              </option>
            ))}
          </select>
        </div>

        {/* Subjects Radio */}
        <div>
          <label className="block font-medium mb-2">Select Subject</label>

          <div className="grid grid-cols-2 gap-2">
            {subjectsList.map((subj) => (
              <label
                key={subj}
                className="flex items-center gap-2 border p-2 rounded cursor-pointer"
              >
                <input
                  type="radio"
                  name="subject"
                  value={subj}
                  checked={formData.subject === subj}
                  onChange={handleChange}
                />
                {subj}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Assign
        </button>
      </form>
    </div>
  );
};

export default AssignSection;
