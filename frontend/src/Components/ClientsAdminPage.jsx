import React, { useEffect, useState } from 'react'
import axios from "../axios"
import Loading from './Loading'
import { Table } from 'react-bootstrap'


const ClientsAdminPage = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        axios.get('/users').then(({data})=>{
            setLoading(false)
            setUsers(data)
        }).catch((error)=>{
            setLoading(false)
            console.log(error)
        })
    }, [])

    if(loading){
        return <Loading></Loading>
    }

    if(users.length===0) return <h2 className='py-2 text-center'>No users yet</h2>
  return (
<Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th>Client Id</th>
                    <th>Client</th>
                    <th>Email</th>
                    
                </tr>
            </thead>

            <tbody>
                {users.map((user)=>(
                    <tr>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
            </tbody>
        </Table> 
    )
}

export default ClientsAdminPage