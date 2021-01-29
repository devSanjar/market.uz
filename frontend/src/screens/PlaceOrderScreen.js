import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import OrderScreen from './OrderScreen'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'


const PlaceOrderScreen = ({ history }) => {
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()

  // Calcaulate Pricess
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  cart.shippingPrice = addDecimals(cart.itemsPrice * 1 / 100)
  // cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100) // correct variant
  cart.taxPrice = addDecimals(Number((0.15) * cart.itemsPrice).toFixed(2))
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)


  const orderCreate = useSelector(state => state.orderCreate)
  const { order, success, error } = orderCreate



  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      shippingPrice: cart.shippingPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
    }))
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col md={2} className='text-center'>
                  <strong>Country: </strong><br></br><i>{cart.shippingAddress.country}</i>
                </Col>
                <Col md={2} className='text-center'>
                  <strong>City:</strong><br></br><i>{cart.shippingAddress.city}</i>
                </Col>
                <Col md={3} className='text-center'>
                  <strong>Address: </strong><br></br><i>{cart.shippingAddress.address}</i>
                </Col>
                <Col md={3} className='text-center'>
                  <strong>Postal Code:</strong><br></br><i>{cart.shippingAddress.postalCode}</i>
                </Col>
                <Col md={2} className='text-center'>
                  <strong>Method: </strong><i>{cart.paymentMethod}</i>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>

          <ListGroup className='pt-4'>
            {/* Order List */}
            <ListGroup.Item>
              {cart.cartItems.length === 0 ? <Message> Your Cart is Empty</Message> : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={3}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={5} className='text-center'>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4} className='text-center'>
                          {item.qty} x ${item.price} = <strong>${item.qty * item.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item variant='success'>
                <h2 className='text-center'>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>


              {error &&
                <ListGroup.Item>
                  <Message variant='danger'>{error}</Message>
                </ListGroup.Item>
              }

              <ListGroup.Item>
                <OrderScreen disabled={cart.cartItems === 0} onClick={placeOrderHandler} />
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
