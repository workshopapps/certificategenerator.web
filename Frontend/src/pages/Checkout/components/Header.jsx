import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, NavLink, Container } from 'react-bootstrap'
import Logo from '../icons/Logo.svg'
import Profile from '../icons/Profile.svg'

function Header() {
  return (
    <Navbar collapseOnSelect expand='lg' id='Header-main-container'>
      <Container>
          <Navbar.Brand href="/" id='logo-text'><img src={Logo} alt="logo" /></Navbar.Brand>
          <Navbar.Toggle aria-controls='Header-navbar-navbarScroll' data-bs-target='#Header-navbar-navbarScroll' id='Header-navbar-toggle' />
          <Navbar.Collapse id='Header-navbar-navbarScroll' className="justify-content-end text-start">
          <Nav id='Header-nav'>
              <NavLink id='Header-nav-list-item-1'>Home</NavLink>
              <NavLink id='Header-nav-list-item-2'>Browse Templates</NavLink>
              <NavLink id='Header-nav-list-item-3'>Pricing</NavLink>
              <NavLink id='Header-nav-list-item-4'>Blog</NavLink>
              <NavLink id='Header-nav-list-item-5'>FAQs</NavLink>
              <NavLink id='Header-nav-list-item-6'>
                <span id='Header-nav-list-item-6-text'>My Account</span>
                <img src={Profile} alt="Profile" height={50} width={50} id='Header-nav-list-item-6-img' />
              </NavLink>
          </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
