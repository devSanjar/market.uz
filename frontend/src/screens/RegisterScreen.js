import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from "../actions/userAction";


const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [message, setMessage] = useState(null)


  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== password2) {
      setMessage('Password do not match')
    } else {
      dispatch(register(name, email, password))
    }

  }



  return (
    <FormContainer>
      <h3 className='text-center'> Sign Up</h3>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>

        <Form.Group controlId='name' className='my-4'>
          <Form.Label><i>Name</i></Form.Label>
          <Form.Control type='name' className='p-4' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='email' className='my-4'>
          <Form.Label><i>Email Address</i></Form.Label>
          <Form.Control type='email' className='p-4' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label><i>Password</i></Form.Label>
          <Form.Control type='password' className='p-4' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password2'>
          <Form.Label><i>Confirm Password</i></Form.Label>
          <Form.Control type='password' className='p-4' placeholder='Confirm Password' value={password2} onChange={(e) => setPassword2(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='warning'>Register</Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an account? {' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
        </Col>
      </Row>

    </FormContainer>
  )
}

export default RegisterScreen
