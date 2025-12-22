import React, { useState, useEffect } from "react";
import { db } from "../db";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    regno: "",
    sname: "",
    classs: "",   // classId
    section: "",  // sectionId
    father: "",
    contact: "",
    image: "",
  });

  const [classList, setClassList] = useState([]);
  const [sectionList, setSectionList] = useState([]);

  // Load classes from Dexie
  useEffect(() => {
    const fetchClasses = async () => {
      const classes = await db.classes.toArray();
      setClassList(classes);
    };
    fetchClasses();
  }, []);

  // Load sections when class changes
  useEffect(() => {
    const loadSections = async () => {
      if (formData.classs) {
        const sections = await db.sections
          .where("classId")
          .equals(parseInt(formData.classs))
          .toArray();
        setSectionList(sections);
      } else {
        setSectionList([]);
      }
    };
    loadSections();
  }, [formData.classs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const AddStudentDetail = async (e) => {
    e.preventDefault();

    // Ensure classs and section are numbers
    const studentData = {
      ...formData,
      classs: Number(formData.classs),
      section: Number(formData.section),
    };

    await db.students.add(studentData);

    alert("✅ Student Added Successfully!");

    setFormData({
      regno: "",
      sname: "",
      classs: "",
      section: "",
      father: "",
      contact: "",
      image: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-blue-100 p-6">
      <form
        onSubmit={AddStudentDetail}
        className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 w-full max-w-lg space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-5">
          Add Student
        </h2>

        {/* Reg No */}
        <div>
          <label className="block font-medium">Reg No:</label>
          <input
            type="text"
            name="regno"
            value={formData.regno}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md"
          />
        </div>

        {/* Student Name */}
        <div>
          <label className="block font-medium">Student Name:</label>
          <input
            type="text"
            name="sname"
            value={formData.sname}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md"
          />
        </div>

        {/* Class */}
        <div>
          <label className="block font-medium">Class:</label>
          <select
            name="classs"
            value={formData.classs}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md"
          >
            <option value="">Select Class</option>
            {classList.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.classname}
              </option>
            ))}
          </select>
        </div>

        {/* Section */}
        <div>
          <label className="block font-medium">Section:</label>
          <select
            name="section"
            value={formData.section}
            onChange={handleChange}
            disabled={!formData.classs}
            className="w-full mt-1 px-3 py-2 border rounded-md"
          >
            <option value="">Select Section</option>
            {sectionList.map((sec) => (
              <option key={sec.id} value={sec.id}> {/* Store sectionId instead of name */}
                {sec.sectionName}
              </option>
            ))}
          </select>
        </div>

        {/* Father Name */}
        <div>
          <label className="block font-medium">Father Name:</label>
          <input
            type="text"
            name="father"
            value={formData.father}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md"
          />
        </div>

        {/* Contact */}
        <div>
          <label className="block font-medium">Contact:</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium">Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImage} />
          {formData.image && (
            <img
              src={formData.image}
              alt="Student"
              className="mt-2 w-32 h-32 object-cover rounded-full border"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;