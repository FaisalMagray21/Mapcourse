// src/db.js
import Dexie from "dexie";

// Create a database
export const db = new Dexie("SignupDatabase");

// Define the schema (table + fields)
db.version(1).stores({
  users: "++id, fullname, email,password, type, contact, address", // auto-increment id
});
