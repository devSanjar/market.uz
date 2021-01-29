import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from "../actions/userAction";
import { USER_UPDATE_RESET } from '../constants/userConstants'


const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)


  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector(state => state.userUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, user, userId, successUpdate, history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }



  return (
    <>
      <Link to='/admin/userlist' className='btn btn-outline-warning my-3'>Go Back</Link>
      <FormContainer>
        <h3 className='text-center'>EDIT USER</h3>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-4'>
              <Form.Label><i>Name</i></Form.Label>
              <Form.Control type='name' className='p-4' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='my-4'>
              <Form.Label><i>Email Address</i></Form.Label>
              <Form.Control type='email' className='p-4' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                className='py-2'
                placeholder='Enter Password'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}>
              </Form.Check>
            </Form.Group>

            <Button type='submit' variant='warning'>Update</Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
