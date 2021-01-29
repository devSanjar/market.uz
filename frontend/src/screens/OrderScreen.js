import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { createOrder } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux'
import { ORDER_CREATE_RESET } from '../constants/orderConstants';

const OrderScreen = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)

  // const orderCreate = useSelector(state => state.orderCreate)
  // const { success } = orderCreate

  useEffect(() => {
    dispatch({ type: ORDER_CREATE_RESET })
  }, [dispatch,])


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
      <Button variant="success" className='btn-block' onClick={handleShow}>
        Send
          </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>

        </Modal.Header>
        <h3 className='py-5 my-5 text-center' style={{ color: 'green' }}><i>MARKET.UZ  <br></br>Successfully Done!</i></h3>
        <Modal.Footer>
          <Button variant="success" onClick={placeOrderHandler}>
            Send
              </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrderScreen
