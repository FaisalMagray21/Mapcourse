import React from 'react'
import Wellcome from './Wellcome'
import Formdata from './Formdata'
import Cafe from './Cafe'
const App = () => {
  const name="Aftab"
  const formatname=(user)=>{
    return user.fname+" "+ user.lname
  }
   const user={
 fname:"Faisal",
 lname:'Mehmood'
  }
  const headingstyle={
    color:"red",
    fontSize: "32px",
    textAlign: "center",
    background:"black"
  }
  return (
    <div>
      {/* <h1 style={headingstyle}>wellcome {formatname(user)} </h1>
      <Wellcome names="faisal"/>
      <Formdata/> */}
      <Cafe/>
    </div>
  )
}

export default App