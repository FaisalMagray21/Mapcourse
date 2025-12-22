// db.js
import Dexie from "dexie";

export const db = new Dexie("StudentDB");

db.version(1).stores({
  students: "++id, name, section, cgpa"
});