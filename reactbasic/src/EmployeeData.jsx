import React, { useState } from "react";

export default function EmployeeData() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    salary: "",
    experience: "",
    gender: "Male",
    country: "",
    city: "",
    division: "",
    agree: false,
  });

  const [records, setRecords] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");

  const countries = [
    { name: "Pakistan", code: "PK" },
    { name: "India", code: "IN" },
  ];

  const cities = [
    { name: "Islamabad", countryCode: "PK" },
    { name: "Lahore", countryCode: "PK" },
    { name: "Delhi", countryCode: "IN" },
    { name: "Mumbai", countryCode: "IN" },
  ];

  // ✅ Divisions linked with city
  const divisions = {
    Islamabad: ["F-6", "F-7", "G-8"],
    Lahore: ["Model Town", "Johar Town", "Gulberg"],
    Delhi: ["North Delhi", "South Delhi"],
    Mumbai: ["Andheri", "Bandra", "Dadar"],
  };

  const filteredCities = cities.filter(
    (c) => c.countryCode === formData.country
  );

  const filteredDivisions = divisions[formData.city] || [];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("Please agree to continue!");
      return;
    }

    if (
      !formData.id ||
      !formData.name ||
      !formData.salary ||
      !formData.experience ||
      !formData.country ||
      !formData.city
    ) {
      alert("Please fill all fields!");
      return;
    }

    const idExists = records.some(
      (rec, index) => rec.id === formData.id && index !== editIndex
    );
    if (idExists) {
      alert("Employee ID must be unique!");
      return;
    }

    if (editIndex !== null) {
      const updated = [...records];
      updated[editIndex] = formData;
      setRecords(updated);
      setEditIndex(null);
    } else {
      setRecords([...records, formData]);
    }

    setFormData({
      id: "",
      name: "",
      salary: "",
      experience: "",
      gender: "Male",
      country: "",
      city: "",
      division: "",
      agree: false,
    });
  };

  const handleDelete = (index) => {
    const updated = [...records];
    updated.splice(index, 1);
    setRecords(updated);
  };

  const handleEdit = (index) => {
    setFormData(records[index]);
    setEditIndex(index);
  };

  // ✅ Filter + Sort Logic
  const filteredAndSortedRecords = records
    .filter((rec) => {
      if (search.trim() === "") return true;
      return (
        rec.id.toLowerCase().includes(search.toLowerCase()) ||
        rec.name.toLowerCase().includes(search.toLowerCase()) ||
        rec.salary.toString().includes(search) ||
        rec.country.toLowerCase().includes(search.toLowerCase())
      );
    })
    .sort((a, b) => a.salary - b.salary);

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>Employee Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Employee ID:{" "}
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </label>
        <br /><br />

        <label>
          Employee Name:{" "}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br /><br />

        <label>
          Salary:{" "}
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </label>
        <br /><br />

        <label>
          Experience (Years):{" "}
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          />
        </label>
        <br /><br />

        <label>Gender: </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === "Male"}
            onChange={handleChange}
          />{" "}
          Male
        </label>
        <label style={{ marginLeft: 10 }}>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === "Female"}
            onChange={handleChange}
          />{" "}
          Female
        </label>
        <br /><br />

        <label>
          Country:{" "}
          <select
            name="country"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value, city: "", division: "" })
            }
            required
          >
            <option value="">--Select Country--</option>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <br /><br />

        <label>
          City:{" "}
          <select
            name="city"
            value={formData.city}
            onChange={(e) =>
              setFormData({ ...formData, city: e.target.value, division: "" })
            }
            disabled={!formData.country}
            required
          >
            <option value="">--Select City--</option>
            {filteredCities.map((c, i) => (
              <option key={i} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <br /><br />

        {/* ✅ Division Dropdown */}
        <label>
          Division:{" "}
          <select
            name="division"
            value={formData.division}
            onChange={handleChange}
            disabled={!formData.city}
            required
          >
            <option value="">--Select Division--</option>
            {filteredDivisions.map((d, i) => (
              <option key={i} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
        <br /><br />

        <label>
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />{" "}
          I Agree
        </label>
        <br /><br />

        <button type="submit">{editIndex !== null ? "Update" : "Submit"}</button>
      </form>

      {/* 🔍 SEARCH SECTION */}
      <div style={{ marginTop: "20px" }}>
        <h3>Search Employees</h3>
        <input
          type="text"
          placeholder="Search by ID, Name, Salary, or Country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "300px", padding: "5px" }}
        />
      </div>

      <br />
      <h3>Employee Records (Sorted by Salary ↑)</h3>
      {filteredAndSortedRecords.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Salary</th>
              <th>Experience</th>
              <th>Gender</th>
              <th>Country</th>
              <th>City</th>
              <th>Division</th>
              <th>Actions</th>
             </tr>
          </thead>
          <tbody>
            {filteredAndSortedRecords.map((rec, index) => (
              <tr key={index}>
                <td>{rec.id}</td>
                <td>{rec.name}</td>
                <td>{rec.salary}</td>
                <td>{rec.experience}</td>
                <td>{rec.gender}</td>
                <td>{rec.country === "PK" ? "Pakistan" : "India"}</td>
                <td>{rec.city}</td>
                <td>{rec.division}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>{" "}
                  <button
                    onClick={() => handleDelete(index)}
                    style={{ color: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
