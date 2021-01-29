import React, { useState } from 'react'
import { Button, Form, FormControl, FormGroup, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartAction'

const ShippingScreen = ({ history }) => {
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const [country, setCountry] = useState(shippingAddress.country)
  const [city, setCity] = useState(shippingAddress.city)
  const [address, setAddress] = useState(shippingAddress.address)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)

  const dispatch = useDispatch()

  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ country, city, address, postalCode, }))
    history.push('/payment')
  }

  return (
    <FormContainer >
      <CheckoutSteps step1 step2 />
      <h2 className='text-center'>Shipping</h2>
      <FormGroup>
        <Form onSubmit={onSubmitHandler}>

          <Form.Group controlId='country' >
            <Form.Label className='my-2'><i><b>Country</b></i></Form.Label>
            <FormControl
              type='text'
              placeholder='Enter Country'
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}

            ></FormControl>
          </Form.Group>

          <Form.Group controlId='city'>
            <Form.Label className='mt-1'><i><b>City</b></i></Form.Label>
            <FormControl
              type='text'
              placeholder='Enter City'
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></FormControl>
          </Form.Group>

          <Form.Group controlId='address'>
            <Form.Label className='mt-1'><i><b>Address </b></i></Form.Label>
            <FormControl
              type='text'
              placeholder='Enter address'
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></FormControl>
          </Form.Group>

          <Form.Group controlId='postalCode'>
            <Form.Label className='mt-1'><i><b>Postal Code </b></i></Form.Label>
            <FormControl
              type='text'
              placeholder='Enter Postal Code'
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></FormControl>

            <Row>
              <Col>
                <Link to='/shipping' className='btn btn-warning btn-block my-3'>
                  <b><i class="fas fa-arrow-left"></i> BACK</b>
                </Link>
              </Col>
              <Col>
                <Button className='my-3' type='submit' variant='warning' block> <b>NEXT <i class="fas fa-arrow-right"></i></b></Button>
              </Col>
            </Row>

          </Form.Group>
        </Form>
      </FormGroup>
    </FormContainer>
  )
}

export default ShippingScreen
