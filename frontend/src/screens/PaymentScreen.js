import React, { useState } from 'react'
import { Button, Form, Col, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartAction'

const PaymentScreen = ({ history }) => {
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState([])

  const dispatch = useDispatch()

  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h2 className='text-center'><b>Payment Method</b></h2>
      <Form onSubmit={onSubmitHandler} className='pt-3'>
        <ListGroup className='pt-3'>
          <ListGroup.Item>
            <Col>
              <Form.Check type='radio' label='PayPal or Credit Card' id='PayPal' name='paymentMethod' value='PayPal' onChange={(e) => setPaymentMethod(e.target.value)}>
              </Form.Check>
            </Col>
          </ListGroup.Item>

          <ListGroup.Item>
            <Col>
              <Form.Check type='radio' label='Uzcard' id='Uzcard' name='paymentMethod' value='Uzcard' onChange={(e) => setPaymentMethod(e.target.value)}>
              </Form.Check>
            </Col>
          </ListGroup.Item>
          <ListGroup.Item>
            <Col>
              <Form.Check type='radio' required label='Humo' id='Humo' name='paymentMethod' value='Humo' onChange={(e) => setPaymentMethod(e.target.value)}>
              </Form.Check>
            </Col>
          </ListGroup.Item>
        </ListGroup>

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
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen





