//react ui component
import { useContext } from "react";
import { FcHome } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { DarkModeContext } from './contexts/DarkModeContext'
const Navbar = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext)

  return (
    <nav>
      <NavLink className='nav-item nav-brand' to="/">
        <FcHome />
      </NavLink>
      <NavLink className={darkMode} to="/about">About</NavLink>
      {!isLoggedIn && <NavLink to="/register">Register</NavLink>}
      {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
      {isLoggedIn && <NavLink to="/games">Games</NavLink>}
    </nav>
  );
};
export default Navbar;
