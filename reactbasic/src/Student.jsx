import React, { useState } from "react";

const Student = () => {
  const [showInfo, setShowInfo] = useState(false);

  // student list
  const [data, setData] = useState([]);

  // form input
  const [formData, setFormData] = useState({
    RegNo: "",
    userName: "",
    cgpa: "",
    skills: [],
    gender: "Male",
  });

  // handle change
  const handleChange = (evt) => {
    const { name, value, type, checked } = evt.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        // add/remove from skills array
        if (checked) {
          return { ...prev, skills: [...prev.skills, value] };
        } else {
          return { ...prev, skills: prev.skills.filter((s) => s !== value) };
        }
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // handle submit
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setShowInfo(true);
    if(formData.RegNo === "" || formData.userName === "" || formData.cgpa === "") {
      alert("Please fill all fields");
      return;
    }

    setData((prev) => [...prev, formData]);

    setFormData({
      RegNo: "",
      userName: "",
      cgpa: "",
      skills: [],
      gender: "Male",
    });
  };

  return (
    <div>
      <h1>Student Information</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Regno:
            <input
              type="text"
              name="RegNo"
              value={formData.RegNo}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            CGPA:
            <input
              type="number"
              name="cgpa"
              value={formData.cgpa}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Skills */}
        <div>
          <label>
            <input
              type="checkbox"
              name="skills"
              value="Python"
              checked={formData.skills.includes("Python")}
              onChange={handleChange}
            />
            Python
          </label>
          <label>
            <input
              type="checkbox"
              name="skills"
              value="Java"
              checked={formData.skills.includes("Java")}
              onChange={handleChange}
            />
            Java
          </label>
          <label>
            <input
              type="checkbox"
              name="skills"
              value="C++"
              checked={formData.skills.includes("C++")}
              onChange={handleChange}
            />
            C++
          </label>
        </div>

        {/* Gender */}
        <div>
          Gender:
          <input
            type="radio"
            value="Male"
            name="gender"
            checked={formData.gender === "Male"}
            onChange={handleChange}
          />{" "}
          Male
          <input
            type="radio"
            value="Female"
            name="gender"
            checked={formData.gender === "Female"}
            onChange={handleChange}
          />{" "}
          Female
        </div>

        <br />
        <input type="submit" value="Submit" />
      </form>

      {/* Table */}
      {showInfo && (
        <div>
          <table
            style={{
              border: "2px solid black",
              borderCollapse: "collapse",
              width: "70%",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th>Regno</th>
                <th>Name</th>
                <th>CGPA</th>
                <th>Gender</th>
                <th>Skills</th>
              </tr>
            </thead>
            <tbody>
              {data.map((student, index) => (
                <tr key={index}>
                  <td>{student.RegNo}</td>
                  <td>{student.userName}</td>
                  <td>{student.cgpa}</td>
                  <td>{student.gender}</td>
                  <td>{student.skills.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Student;
