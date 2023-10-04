import { Container, Nav, Navbar } from 'react-bootstrap';
import CartWidget from '../CartWidget/CartWidget';
import { NavLink, Link } from 'react-router-dom';

function NavBar() {
  return (
    <Navbar bg='success' expand='lg' variant='dark'>
      <Container>
        <Link to="/" className="navbar-brand">LOGITECH</Link>
        <Navbar.Toggle aria-controls='navbar-nav' />
        <Navbar.Collapse id='navbar-nav'>
          <Nav className='mr-auto'>
            <NavLink className='nav-link' to='/categoria/Mouses'>
              Mouses
            </NavLink>
            <NavLink className='nav-link' to='/categoria/Teclados'>
              Teclados
            </NavLink>
            <NavLink className='nav-link' to='/categoria/Auriculares'>
              Auriculares
            </NavLink>
          </Nav>
          <Nav className='ml-auto'>
            <CartWidget />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
