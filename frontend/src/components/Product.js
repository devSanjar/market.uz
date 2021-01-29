import React, { useState, } from 'react';
import { useDispatch, } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Button, Modal, ListGroup, FormControl } from 'react-bootstrap';
import Rating from '../components/Rating';

import { addObject } from '../actions/cartAction';

const Product = ({ product }) => {
  const [qty, setQty] = useState(0);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  // Modal open / close
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addToCartHandler = () => {
    const object = {
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty: Number(qty),
    };
    dispatch(addObject(object));
    handleClose();
  }

  return (
    <Card className='shadow-sm  my-3 bg-white rounded text-center'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <hr />
        <Row>
          <Col md={12} className='text-center'>
            <Card.Text as='h3'>${product.price}</Card.Text>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={10}>
            <Rating value={product.rating} text={(`${product.numReviews}`)} />
          </Col>
          <Col md={2}>
            <Button
              variant='outline-danger'
              className='float-right'
              size='sm'
              onClick={() => handleShow()}
            >
              <i className="fas fa-cart-arrow-down"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Card>
                <ListGroup variant='flush' className='total-card shadow-sm p-1 '>
                  <ListGroup.Item >
                    <Row>
                      <Col>
                        <strong>Price:</strong>
                      </Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col><strong>Status:</strong></Col>
                      <Col><strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong></Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <FormControl as='select' value={qty} onChange={(e) => setQty(e.target.value)}>

                            {[...Array(product.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>{x + 1}</option>
                            ))}

                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className='btn btn-warning btn-block'
                      disabled={product.countInStock === 0}
                      onClick={() => addToCartHandler()}
                    >
                      Add To Cart
                      </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Modal>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default Product;