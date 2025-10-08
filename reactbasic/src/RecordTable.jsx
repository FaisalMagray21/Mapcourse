import React from 'react'

const RecordTable = () => {
    const records=[
        {
            id:1,
            name:"John",
            age:20,

        },
        {
            id:2,
            name:"Jane",
            age:22,
        },
        {
            id:3,
            name:"Jack",
            age:21,
        },
        {
            id:4,
            name:"Jill",
            age:23,
        }
    ]
  return (
    <div style={{textAlign:"center"}}>
        <h1>Record table</h1>
        <table border={1} style={{margin:"auto"}}>
            <tr>
                <th>
                    ID
                </th>
                <th>
                    Name
                </th>
                <th>
                    Age
                </th>
                            </tr>

            {
                records.map((record)=>{
                    return (
                        <tr key={record.id}>
                            <td>{record.id}</td>
                            <td>{record.name}</td>
                            <td>{record.age}</td>
                        </tr>
                    )
                })
            }
        </table>

    </div>
  )
}

export default RecordTable