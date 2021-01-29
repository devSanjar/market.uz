import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../actions/userAction";
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'


const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h3 className='text-center'> Sign In</h3>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-4'>
          <Form.Label><i>Email Address</i></Form.Label>
          <Form.Control type='email' className='p-4' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label><i>Password</i></Form.Label>
          <Form.Control type='password' className='p-4' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' className='lgSc-btn' variant='warning'>Sign In</Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer? {' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
      </Row>

    </FormContainer>
  )
}

export default LoginScreen
