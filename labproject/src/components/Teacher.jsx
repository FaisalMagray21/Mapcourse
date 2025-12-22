import React, { useState, useEffect } from "react";
import { db } from "../db";

const TeacherDashboard = ({ userEmail }) => {
  const [assigned, setAssigned] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [students, setStudents] = useState([]);

  // Load teacher's assigned sections
  const loadAssignedSections = async () => {
    if (!userEmail) return;

    const data = await db.assignedSections
      .where("teacherEmail")
      .equals(userEmail)
      .toArray();

    // Fetch className and sectionName
    const dataWithNames = await Promise.all(
      data.map(async (a) => {
        const cls = await db.classes.get(Number(a.classId));
        const sec = await db.sections.get(Number(a.sectionId));
        return {
          ...a,
          className: cls?.classname ?? "Unknown Class",
          sectionName: sec?.sectionName ?? "Unknown Section",
        };
      })
    );

    setAssigned(dataWithNames);
  };

  // Load students for selected section
  const loadStudents = async (classId, sectionId) => {
    const stds = await db.students
      .where("classs")
      .equals(Number(classId))
      .and((s) => Number(s.section) === Number(sectionId))
      .toArray();

    setStudents(stds);
  };

  // On section click
  const handleSectionClick = async (section) => {
    setSelectedSection(section);
    await loadStudents(section.classId, section.sectionId);
  };

  useEffect(() => {
    loadAssignedSections();
  }, [userEmail]);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        Teacher Dashboard
      </h2>

      {/* Assigned Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {assigned.map((a) => (
          <div
            key={a.id}
            onClick={() => handleSectionClick(a)}
            className={`p-4 border rounded shadow cursor-pointer hover:bg-indigo-50 
                        ${selectedSection?.id === a.id ? "bg-indigo-100" : ""}`}
          >
            <h3 className="text-xl font-semibold text-indigo-700">
              Class: {a.className} - Section: {a.sectionName}
            </h3>
            <p>Subject: {a.subject}</p>
          </div>
        ))}
      </div>

      {/* Students Table */}
      {selectedSection && (
        <div className="mt-6">
          <h3 className="text-2xl font-bold text-indigo-600 mb-3">
            Students in {selectedSection.className} - {selectedSection.sectionName}
          </h3>

          {students.length === 0 ? (
            <p>No students found in this section.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
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
                  {students.map((s) => (
                    <tr key={s.id} className="border-b hover:bg-gray-100">
                      <td className="py-2 px-4">{s.id}</td>
                      <td className="py-2 px-4">{s.regno}</td>
                      <td className="py-2 px-4">{s.sname}</td>
                      <td className="py-2 px-4">{s.father}</td>
                      <td className="py-2 px-4">{s.contact}</td>
                      <td className="py-2 px-4">
                        {s.image ? (
                          <img
                            src={s.image}
                            alt={s.sname}
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
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;