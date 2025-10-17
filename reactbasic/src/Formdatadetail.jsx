import React, { useState } from "react";

export default function FormDataDetail() {
  // Country list (numeric codes)
  const countries = [
    { code: "92", name: "Pakistan" },
    { code: "91", name: "India" },
    { code: "1", name: "United States" },
  ];

  // City list (numeric codes)
  const cities = [
    { code: "44000", name: "Islamabad", countryCode: "92" },
    { code: "54000", name: "Lahore", countryCode: "92" },
    { code: "110001", name: "Delhi", countryCode: "91" },
    { code: "400001", name: "Mumbai", countryCode: "91" },
    { code: "10001", name: "New York", countryCode: "1" },
    { code: "90001", name: "Los Angeles", countryCode: "1" },
  ];

  // Skill list
  const skillOptions = ["C#", "Java", "Python", "React"];

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    isAdmin: false, 
    skills: [],
    country: "",
    city: "",
  });

  // Handle text, number, and radio inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // special handling for checkbox (isAdmin)
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle multiple skill checkboxes
  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedSkills = checked
        ? [...prev.skills, value]
        : prev.skills.filter((s) => s !== value);
      return { ...prev, skills: updatedSkills };
    });
  };

  // Filter cities by selected country
  const filteredCities = cities.filter((c) => c.countryCode === formData.country);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>Complete React Form </h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <label>
          Name:{" "}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br /><br />

        {/* Age */}
        <label>
          Age:{" "}
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>
        <br /><br />

        {/* Gender */}
        <label>Gender: </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={formData.gender === "Male"}
            onChange={handleChange}
          /> Male
        </label>
        <label>
          <input style={{
            backgroundColor:"yellow"
          }}
            
            type="radio"
            name="gender"
            value="Female"
            checked={formData.gender === "Female"}
            onChange={handleChange}
          /> Female
        </label>
        <br /><br />

       
        <label>
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={handleChange}
          />{" "}
          Is Admin
        </label>
        <br /><br />

        {/* Skills */}
        <label>Skills: </label>
        {skillOptions.map((s) => (
          <label key={s} style={{ marginLeft: 10 }}>
            <input
              type="checkbox"
              value={s}
              checked={formData.skills.includes(s)}
              onChange={handleSkillChange}
            />{" "}
            {s}
          </label>
        ))}
        <br /><br />

        {/* Country */}
        <label>
          Country:{" "}
          <select
            name="country"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value, city: "" })
            }
          >
            <option value="">-- Select Country --</option>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                   {c.name} ({c.code})
              </option>
            ))}
          </select>
        </label>
        <br /><br />

        {/* City */}
        <label>
          City:
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!formData.country}
          >
            <option value="">-- Select City --</option>
            {filteredCities.map((c) => (
              <option key={c.code} value={c.name}>
                ({c.name}) {c.code}
              </option>
            ))}
          </select>
        </label>
        <br /><br />

        <button type="submit">Submit</button>
      </form>

      <br />
      <h4>Form Data Preview:</h4>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}