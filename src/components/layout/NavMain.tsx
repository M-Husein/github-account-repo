
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';

export default function NavMain(){
  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm" id="navMain">
      <Container>
        <Link
          href="/"
          className="navbar-brand"
        >
          GAR
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" className="nav-link">
              Home
            </Link>
            
            <Dropdown className="nav-item">
              <Dropdown.Toggle as="button" className="nav-link btn" id="dropdown-basic">
                Dropdown
              </Dropdown.Toggle>
              <Dropdown.Menu className="shadow-sm">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#/action-3">Something</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
