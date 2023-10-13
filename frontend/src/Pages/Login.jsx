import React, { useState } from 'react'
import { Col, Container, Form, Row, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../Styles/Signup.css'
import { useLoginMutation } from '../services/appApi'


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [login, {isError, isLoading, error}] = useLoginMutation();


    const handleLogin=(e)=>{
        e.preventDefault()
        login({email, password})
    }

  return (
    <Container>
        <Row>
            <Col md={6} className="login__form--container">
                <Form style={{width: "100%"}} onSubmit={handleLogin}>
                    <h1>Login to your account</h1>
                    {isError && <Alert variant="danger">{error.data}</Alert>}

                    <Form.Group className='mb-3'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Enter email" value={email} required></Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter password" value={password} required></Form.Control>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Button type="submit" disabled={isLoading}> Log in</Button>
                    </Form.Group>

                    <p>
                        Don't have an account? <Link to ="/signup">Create account</Link>
                    </p>

                </Form> 
            </Col>
            <Col md={6} className="login__image--container">

            </Col>
        </Row>
    </Container>
  )
}

export default Login