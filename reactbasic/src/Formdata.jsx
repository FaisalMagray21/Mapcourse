import React from 'react'

const Formdata = () => {
    const [name,setname]=React.useState("")
  return (
    <div>
        <form action="">
            <label >Name</label>
            <input type="text" id="name" onChange={(e) => setname(e.target.value)} />
            <p>Your name is {name}</p>
            <button type="submit">Submit</button>

        </form>
    </div>
  )
}

export default Formdata