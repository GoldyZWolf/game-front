import { Route, Routes } from "react-router-dom";
import Home from './routes/Home';
import About from './routes/About';
import Games from './routes/Games';
import Register from './routes/Register';
import Login from './routes/Login';
import { useContext, useEffect } from "react";
import AuthContext from './contexts/AuthContext'
import BNavbar from "./components/BNavbar";
import { DarkModeContext } from './contexts/DarkModeContext'
import GamesDetails from "./routes/GamesDetails";
import './styles/App.css'
import { Button } from "react-bootstrap";

function App() {
  useEffect(()=>{
    const dark = darkMode ? "bg-dark" : "bg-light"
    document.body.classList = dark
  })

  const { isLoggedIn } = useContext(AuthContext)
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext)
  return (
    <>
      <BNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        

        {/* only if not logged in: login/register routes are available */}
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {!isLoggedIn && <Route path="/register" element={<Register />} />}

        {/* if logged in - games route is available */}
        {isLoggedIn && <Route path="/games" element={<Games />} />}
        {isLoggedIn && <Route path="/games/:id" element={<GamesDetails />} />}
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
export default App;
