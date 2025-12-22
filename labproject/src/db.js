import Dexie from "dexie";

// Create DB
export const db = new Dexie("SchoolDB");

// Define tables 
db.version(1).stores({
  // Users table for Signup/Login
  users: "++id, fullname, email, password, type, contact, address",

  // Students table for AddStudent
  students: "++id, regno, sname, classs, section, father, contact, image",

  // Class list (AdminClassSection)
  classes: "++id, classname",

  // Section list linked with classId
  sections: "++id, classId, sectionName",

  // ⭐ NEW — Assigned Section (Admin → Teacher)
  assignedSections: "++id, teacherEmail, classId, sectionId, subject"
});
