import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
// import CheckoutSteps from '../components/CheckoutSteps'
import { getOrderDetails } from '../actions/orderActions'
import Loader from '../components/Loader'
// import OrderScreen from './OrderScreen'


const ViewFinalScreen = ({ history, match }) => {
  const orderId = match.params.id

  const dispatch = useDispatch()

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails

  if (!loading) {
    // Calcaulate Pricess
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }


  // const cart = useSelector(state => state.cart)
  // const dispatch = useDispatch()

  // Calcaulate Pricess
  // const addDecimals = (num) => {
  //   return (Math.round(num * 100) / 100).toFixed(2)
  // }

  // cart.itemsPrice = addDecimals(
  //   cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  // )

  // cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  // cart.taxPrice = addDecimals(Number((0.15) * cart.itemsPrice).toFixed(2))
  // cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)


  useEffect(() => {
    dispatch(getOrderDetails(orderId))
  }, [dispatch, orderId])



  return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
    <h1 className='text-center my-3'>Order {order._id}</h1>
    <Row>
      <Col md={8}>
        <ListGroup>
          <ListGroup.Item variant='secondary'>
            <Row>
              <Col md={2} className='text-center'>
                <strong>Country: </strong><br></br><i>{order.shippingAddress.country}</i>
              </Col>
              <Col md={2} className='text-center'>
                <strong>City:</strong><br></br><i>{order.shippingAddress.city}</i>
              </Col>
              <Col md={3} className='text-center'>
                <strong>Address: </strong><br></br><i>{order.shippingAddress.address}</i>
              </Col>
              <Col md={3} className='text-center'>
                <strong>Postal Code:</strong><br></br><i>{order.shippingAddress.postalCode}</i>
              </Col>
              <Col md={2} className='text-center'>
                <strong>Method: </strong><i>{order.paymentMethod}</i>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>

        <ListGroup className='pt-3' >
          {/* Order List */}
          <ListGroup.Item variant='secondary'>
            {order.orderItems.length === 0 ? <Message> Order is Empty</Message> : (
              <ListGroup variant='flush' >
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index} variant='secondary'>
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
            <ListGroup.Item variant='secondary'>
              <h2 className='text-center' style={{ color: 'green' }}>Order Summary</h2>
            </ListGroup.Item>

            <ListGroup.Item variant='secondary'>
              <Row>
                <Col><b>Items</b></Col>
                <Col>${order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item variant='secondary'>
              <Row>
                <Col><b>Shipping</b> 1% </Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item variant='secondary'>
              <Row>
                <Col><b>Tax</b> 15% </Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item variant='success'>
              <Row>
                <Col><h3>Total</h3></Col>
                <Col><h3>${order.totalPrice}</h3></Col>
              </Row>
            </ListGroup.Item>

          </ListGroup>
        </Card>
      </Col>
    </Row>
  </>

}

export default ViewFinalScreen
