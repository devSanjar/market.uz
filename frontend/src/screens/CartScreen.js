import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartAction'



const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'> <strong> Go Back</strong></Link></Message> : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={3}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2} className='item-price'>
                    <strong> ${item.price}</strong>
                  </Col>
                  <Col md={2}>
                    <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                      {[...Array(item.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type='button' variant='outline-danger' onClick={() => removeFromCartHandler(item.product)}><i className="fas fa-trash-alt"></i></Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4} className='total-box text-center'>
        <Card>
          <ListGroup variant='flush' className='total-card shadow-sm p-1'>
            <ListGroup.Item>
              <h2 className='subtotal-h2'>
                TOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) ITEMS
              </h2>
            </ListGroup.Item>
            <ListGroup.Item className='checkout-price shadow-sm'>
              <strong>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type='button' className='btn btn-warning btn-block my-1' disabled={cartItems.length === 0} onClick={checkoutHandler}><strong>Checkout</strong></Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
