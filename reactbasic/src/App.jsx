import React from 'react'
import Wellcome from './Wellcome'
import Formdata from './Formdata'
import Cafe from './Cafe'
import Student from './Student'
import RecordTable from './RecordTable'
import Formdatadeatil from './Formdatadetail'
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
      {/* <Cafe/> */}
      {/* <Student/> */}
      {/* <RecordTable/> */}
      <Formdatadeatil/>
    </div>
  )
}

export default App