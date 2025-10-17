import React, { useState } from "react"; 
import "./App.css";  
export default function Fullform() { 
// Country list 
const countries = [ 
{ code: "92", name: "Pakistan" }, 
{ code: "91", name: "India" }, 
{ code: "1", name: "United States" }, 
]; 
// City list 
  const cities = [ 
    { code: "44000", name: "Islamabad", countryCode: "92" }, 
    { code: "54000", name: "Lahore", countryCode: "92" }, 
    { code: "110001", name: "Delhi", countryCode: "91" }, 
    { code: "400001", name: "Mumbai", countryCode: "91" }, 
    { code: "10001", name: "New York", countryCode: "1" }, 
    { code: "90001", name: "Los Angeles", countryCode: "1" }, 
  ]; 
 
  const skillOptions = ["C#", "Java", "Python", "React"]; 
 
  // Initial form data 
  const defaultForm = { 
    name: "", 
    age: "", 
    gender: "Male", 
    isAdmin: false, 
    skills: [], 
    country: "", 
    city: "", 
  }; 
 
  const [formData, setFormData] = useState(defaultForm); 
  const [records, setRecords] = useState([]); 
  const [editIndex, setEditIndex] = useState(null); 
 
  // Handle input changes 
  const handleChange = (e) => { 
    const { name, value, type, checked } = e.target; 
    setFormData({ 
      ...formData, 
      [name]: type === "checkbox" ? checked : value, 
    }); 
  }; 
 
  // Handle skill checkbox 
  const handleSkillChange = (e) => { 
    const { value, checked } = e.target; 
    setFormData((prev) => { 
      const updatedSkills = checked 
        ? [...prev.skills, value] 
        : prev.skills.filter((s) => s !== value); 
      return { ...prev, skills: updatedSkills }; 
    }); 
  }; 
 
  // Filter cities based on selected country 
  const filteredCities = cities.filter((c) => c.countryCode === 
formData.country); 
 
  // Handle Add / Update submit 
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    if (editIndex !== null) { 
      // Update existing record 
      const updated = [...records]; 
      updated[editIndex] = formData; 
      setRecords(updated); 
      setEditIndex(null); 
    } else { 
      // Add new record 
      setRecords([...records, formData]); 
    } 
    setFormData(defaultForm); 
  }; 
 
  // Handle Edit 
  const handleEdit = (index) => { 
    setFormData(records[index]); 
    setEditIndex(index); 
  }; 
 
  // Handle Delete 
  const handleDelete = (index) => { 
    if (window.confirm("Are you sure you want to delete this record?")) { 
      const updatedRecords = records.filter((_, i) => i !== index); 
      setRecords(updatedRecords); 
 
      
      if (editIndex === index) { 
        setEditIndex(null); 
        setFormData(defaultForm); 
      } 
    } 
  }; 
 
  
  const handleCancel = () => { 
    setEditIndex(null); 
    setFormData(defaultForm); 
  }; 
 
  return ( 
    <div className="container"> 
      <h2>React CRUD Form</h2> 
 
      <form onSubmit={handleSubmit} className="form-box"> 
        <div className="form-group"> 
          <label>Name:</label> 
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          /> 
        </div> 
 
        <div className="form-group"> 
          <label>Age:</label> 
          <input 
            type="number" 
            name="age" 
            value={formData.age} 
            onChange={handleChange} 
            required 
          /> 
        </div> 
 
        <div className="form-group"> 
          <label>Gender:</label> 
          <div className="radio-group"> 
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
            <label> 
              <input 
                type="radio" 
                name="gender" 
                value="Female" 
                checked={formData.gender === "Female"} 
                onChange={handleChange} 
              />{" "} 
              Female 
            </label> 
          </div> 
        </div> 
 
        <div className="form-group"> 
          <label> 
            <input 
              type="checkbox" 
              name="isAdmin" 
              checked={formData.isAdmin} 
              onChange={handleChange} 
            />{" "} 
            Is Admin 
          </label> 
        </div> 
 
        <div className="form-group"> 
          <label>Skills:</label> 
          <div className="checkbox-group"> 
            {skillOptions.map((s) => ( 
              <label key={s}> 
                <input 
                  type="checkbox" 
                  value={s} 
                  checked={formData.skills.includes(s)} 
                  onChange={handleSkillChange} 
                />{" "} 
                {s} 
              </label> 
            ))} 
          </div> 
        </div> 
 
        <div className="form-group"> 
          <label>Country:</label> 
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
                {c.name} 
              </option> 
            ))} 
          </select> 
        </div> 
 
        <div className="form-group"> 
          <label>City:</label> 
          <select 
            name="city" 
            value={formData.city} 
            onChange={handleChange} 
            disabled={!formData.country} 
          > 
            <option value="">-- Select City --</option> 
            {filteredCities.map((c) => ( 
              <option key={c.code} value={c.code}> 
                {c.name} 
              </option> 
            ))} 
          </select> 
        </div> 
 
        <button type="submit" className="btn-primary"> 
          {editIndex !== null ? "Update Record" : "Add Record"} 
        </button> 
 
        {editIndex !== null && ( 
          <button 
            type="button" 
            className="btn-cancel" 
            onClick={handleCancel} 
            style={{ marginTop: "10px" }} 
          > 
            Cancel Edit 
          </button> 
        )} 
      </form> 
 
      <h3>Records Table</h3> 
      {records.length === 0 ? ( 
        <p>No records yet.</p> 
      ) : ( 
        <table> 
          <thead> 
            <tr> 
              <th>Name</th> 
              <th>Age</th> 
              <th>Gender</th> 
              <th>Admin</th> 
              <th>Skills</th> 
              <th>Country</th> 
              <th>City</th> 
              <th>Actions</th> 
            </tr> 
          </thead> 
          <tbody> 
            {records.map((r, i) => ( 
              <tr key={i} className={r.isAdmin ? "admin-row" : "user-row"}> 
                <td>{r.name}</td> 
                <td>{r.age}</td> 
                <td>{r.gender}</td> 
                <td>{r.isAdmin ? "Yes" : "No"}</td> 
                <td>{r.skills.join(", ")}</td> 
                <td>{countries.find((c) => c.code === r.country)?.name}</td> 
                <td>{cities.find((c) => c.code === r.city)?.name}</td> 
                <td> 
                  <button className="btn-edit" onClick={() => handleEdit(i)}> 
                    Edit 
                  </button> 
                  <button className="btn-delete" onClick={() => handleDelete(i)}> 
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
 
