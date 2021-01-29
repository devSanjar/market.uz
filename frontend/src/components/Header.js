import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Form, Nav, Navbar, FormControl, NavDropdown, Badge, DropdownButton, Container } from 'react-bootstrap'
import { logout } from '../actions/userAction'


const Header = () => {

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const logoutHandler = () => {
    dispatch(logout())
  }


  return (
    <header>
      <Navbar bg='info' variant='dark' expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand><img src='/images/logo.png' alt='logo' style={{ width: '180px' }} /></Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-light">Search</Button>
            </Form>
            <Nav className="ml-auto">

              {/* BADGE */}
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <Button
                    size='lg'
                    variant="light">
                    <i className='fas fa-shopping-cart'></i>
                    <Badge variant='danger ml-2'>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</Badge>
                    <Badge>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</Badge>
                  </Button>
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <DropdownButton title={userInfo.name} id='username' size='lg' className='pt-2 px-1' variant='danger'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item as="button">Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item as="button" onClick={logoutHandler}>Logout</NavDropdown.Item>
                  {/* <Button variant='light' onClick={logoutHandler}>Logout</Button> */}
                </DropdownButton>
              ) : (
                  <LinkContainer to='/login'>
                    <Nav.Link className='pt-3'><i className='fas fa-user' />  Sign In</Nav.Link>
                  </LinkContainer>
                )}

              {/* Admin */}
              {userInfo && userInfo.isAdmin && (
                <DropdownButton title='LISTS' id='adminmenu' size='lg' className='pt-2' variant='danger'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item as="button">Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item as="button">Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item as="button">Orders</NavDropdown.Item>
                  </LinkContainer>
                </DropdownButton>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
