import React, { useContext, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import { FcHome } from "react-icons/fc";
import AuthContext from "../contexts/AuthContext";
import DarkModeContext from "../contexts/DarkModeContext";
const BNavbar = () => {
  const [isNavExpanded, setNavExpanded] = useState(false);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  const closeNav = () => {
    setNavExpanded(false);
  };

  const { isLoggedIn, logout } = useContext(AuthContext);
  const nav = useNavigate();
  const handleLogout = () => {
    //1) logout context (memory)
    logout();
    //2) logout disk (authService)
    authService.logout();
    //3) nav to /home
    nav("/");
  };
  return (
    <>
      <Navbar
        expanded={isNavExpanded}
        onToggle={setNavExpanded}
        bg={darkMode ? "dark" : "light"}
        expand="lg"
      >
        <Container fluid>
          {/* <NavLink to="/" className="navbar-brand">
            <FcHome />
          </NavLink> */}

          {/* Burger Button (hidden in larger devices) */}
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          {/* Collapse (hidden in smaller devices) */}
          <Navbar.Collapse>
            <Nav className="me-auto" onClick={closeNav}>
              <NavLink to="/">
                <FcHome />
              </NavLink>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <NavLink className="btn btn-outline-info" to="/about">
                About
              </NavLink>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              {isLoggedIn && (
                <NavLink className="btn btn-outline-info btn-games" to="/games">
                  Games
                </NavLink>
              )}
              {!isLoggedIn && (
                <NavLink
                  className="btn btn-outline-info btn-register"
                  to="/register"
                >
                  Register
                </NavLink>
              )}
              &nbsp;&nbsp;|&nbsp;&nbsp;
              {!isLoggedIn && (
                <NavLink className="btn btn-outline-info btn-login" to="/login">
                  Login
                </NavLink>
              )}
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-info btn-logout"
                >
                  Logout
                </button>
              )}
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <button className="btn btn-outline-info" onClick={toggleDarkMode}>
                {darkMode ? "Dark" : "Light"}
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default BNavbar;
