import { useState } from 'react';



function Formdata() {
  const [showInfo,setShowInfo]=useState(false)
  const [save,setsave]=useState([]);
  const [data,setData]=useState(
    {
      userName:'',
      age:'',
      gender:'Male',
      isAdmin:false,
      country:'pak',
      status:'married',
      city:'lahore'
    }
  )
const handlesubmit=(evt)=>{
  setShowInfo(!showInfo)
  evt.preventDefault()


}
const handleChange=(evt)=>{
const {name,value,type,checked}=evt.target;
setData((prev)=>(
  {
    ...prev,
    [name]:type==='checkbox'?checked:value
    
  }));
}
setsave((prev)=>{
[...prev,setData]
});

 

 

  return (
   <div>
Form Data
<form onSubmit={handlesubmit}>
<div>
  <label>
    Name:
    <input type="text" name="userName" value={data.userName}
    onChange={handleChange}/>
  </label>
</div>
<div>
  <label>
    Age:
    <input type="text" name="age" value={data.age}
    onChange={handleChange} />
  </label>
</div>
<div>
 Country <select name="country" selectedvalue={data.country}  onChange={handleChange}>
<option value="pak">Pakistan</option>
<option value="US">USA</option>
  </select>
</div>
<div>
  City  <select name="city" selectedvalue={data.city}  onChange={handleChange}>
<option value="lahore">lahore</option>
<option value="rawalpindi">Rawalpindi</option>
<option value="karachi">karachi</option>
<option value="islamabad">islamabad</option>

  </select>

</div>
<div>
  <label>
    Gender:
    <input type="radio" value="Male" name="gender"  checked={data.gender==='Male'}
    onChange={handleChange} /> Male
      <input type="radio" value="Female" name="gender"  checked={data.gender==='Female'}
    onChange={handleChange} /> Female
  </label>
  <br/>
    <label>
    Status:
    <input type="radio" value="Married" name="status"  checked={data.status==='Married'}
    onChange={handleChange} /> Married
      <input type="radio" value="single" name="status"  checked={data.status==='single'}
    onChange={handleChange} /> single
  </label>

</div>
<div>
  <input type="checkbox" name='isAdmin' checked={data.isAdmin} onChange={handleChange}  /> IsAdmin
</div>

<div>

</div>
<input type="submit" value="submit" />
</form>
 {/* Conditional Rendering */}
{showInfo &&
  <div>
    <h2>Name:{data.userName}</h2>
    <h2>Age:{data.age}</h2>
        <h2>Gender:{data.gender}</h2>
         <h2>IsAdmin:{data.isAdmin?"Yes":"No"}</h2>
          <h2>Country Code:{data.country}</h2>
                    <h2>Status:{data.status}</h2>
                    <h2>City:{data.city}</h2>

    </div>
}

   </div>
  
  );
}

export default Formdata;
