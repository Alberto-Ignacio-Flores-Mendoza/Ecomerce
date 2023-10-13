import React, { useState } from 'react'
import { Col, Container, Form, Row, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../Styles/Signup.css'
import {useSignupMutation} from "../services/appApi"


const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [signup, { error, isLoading, isError }] = useSignupMutation();

    const handleSignup=(e)=>{
        e.preventDefault();
        signup({name, email, password})

    }

  return (
<Container>
        <Row>
            <Col md={6} className="signup__form--container">
                <Form style={{width: "100%"}} onSubmit={handleSignup}> 
                    <h1>Sign Up</h1>
                    {isError && <Alert variant='danger'></Alert>}
                    <Form.Group className='mb-3'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={(e)=>setName(e.target.value)} type="text" placeholder="Enter email" value={name} required></Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" value={email} required></Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3' >
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter password" value={password} required></Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3' >
                        <Button type="submit" disabled={isLoading}> Log in</Button>
                    </Form.Group>

                    <p>
                        Already have an account? <Link to ="/Login">Login</Link>
                    </p>

                </Form> 
            </Col>
            <Col md={6} className="signup__image--container">
            </Col>
        </Row>
    </Container>
    )
}

export default Signup