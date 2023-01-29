import { useEffect } from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import FormCheck from 'react-bootstrap/FormCheck';
import { BsMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { handledarkMode } from "@/store/actions/darkModeAction";

export default function NavMain(){
  const dispatch: any = useDispatch();
  const mode = useSelector((state: any) => state.darkMode);
  const { isDarkMode } = mode;

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light');
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if(metaTheme){
      metaTheme.setAttribute('content', isDarkMode ? '#181818' : '#ffffff');
    }
  }, [isDarkMode]);

  const switchDarkMode = () => {
    dispatch(handledarkMode(!isDarkMode));
  }

  return (
    <Navbar
      bg={isDarkMode ? 'dark' : 'light'}
      expand="lg"
      sticky="top"
      className="shadow-sm"
      id="navMain"
    >
      <Container>
        <Link
          href="/"
          className="navbar-brand"
        >
          GAR
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <FormCheck
              type="switch"
              id="switchDarkLight"
              className="navbar-text flex-none d-flex align-items-center me-3"
              label={isDarkMode ? <BsMoonStarsFill color="white" /> : <BsFillSunFill />}
              defaultChecked={isDarkMode}
              onChange={switchDarkMode}
            />
            
            <Dropdown align="end" className="nav-item">
              <Dropdown.Toggle as="button" className="nav-link btn" id="dropdown-basic">
                Info
              </Dropdown.Toggle>
              <Dropdown.Menu className="shadow-sm">
                <Dropdown.Item href="https://github.com/M-Husein" target="_blank" rel="noopener noreferrer">Github Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="https://github.com/M-Husein/github-account-repo" target="_blank" rel="noopener noreferrer">Repository</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
