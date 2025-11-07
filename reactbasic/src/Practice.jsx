import React from 'react'
import { useState } from 'react'

const Practice = () => {
    const [username,setusername]=useState("");
    const [password,setpassword]=useState("");
  return (
    <div>
        <form >
            <input type="text" value={username} onChange={(e)=>{
                setusername(e.target.value)
            }} />
             <input type="password" value={password} onChange={(e)=>{
                setpassword(e.target.value)
            }} />
            <button onClick={(e)=>{
                e.preventDefault();
            }}>Submit</button>

        </form>
        {username} {password}
    </div>
  )
}

export default Practice