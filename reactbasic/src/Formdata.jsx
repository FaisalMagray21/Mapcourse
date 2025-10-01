import React from 'react'
import { useState } from 'react'

const Formdata = () => {
    // const [name,setname]=useState("")
    // const [age,setage]=useState("");
    const[formdata,setformdata]=useState({
      name:"",
      age:"",
    })
    const handlerchange=(e)=>{
      const {name,value}=e.target
      setformdata({...formdata,[name]:value})
    }
  return (
    <div>
        <form action="">
            <label >Name</label>

            <input type="text" value={formdata.name} name="name" onChange={handlerchange} />
            <br/>
            <label >Age</label>
            <input type="number" name="age" value={formdata.age} onChange={handlerchange} />

            <p>Your name is {formdata.name}</p>
            <p>your age is {formdata.age}</p>
            <button type="submit"onClick={(e)=>{
              e.preventDefault();
            }}>Submit</button>

        </form>
    </div>
  )
}

export default Formdata