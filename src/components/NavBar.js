import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { useAuth } from './context/auth'

const NavBar = () => {
  const { setAuthToken, authToken } = useAuth()
  const logOut = () => {
    setAuthToken();
    return <Redirect to="/" />
  }

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Jobly</NavbarBrand>
        {authToken ? <>
        <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/companies">Companies</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/jobs">Jobs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/profile">Profile</NavLink>
            </NavItem>
          </Nav> 
        <Nav className="ml-auto">  
        <NavLink className="btn" onClick={logOut}>Logout</NavLink> 
        </Nav>
        </>
          :
        <Nav className="ml-auto">  
          <NavLink className="float-right" href="/login">Login</NavLink>
        </Nav>
        }
      </Navbar>
    </div>
  );
}

export default NavBar;