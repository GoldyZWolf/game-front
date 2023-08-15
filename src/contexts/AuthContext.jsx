import { useEffect, useState, createContext } from "react";

const initialState = {
  isLoggedIn: false,
  login: (email, token) => {},
  logout: () => {},
};
//2) create the context:
const AuthContext = createContext(initialState);
//3) create the wrapper:
const AuthContextProvider = (props) => {
  useEffect(() => {
    const userData = localStorage.getItem("email");
    if (userData) {
      const { email, token } = JSON.parse(userData);
      login(email, token);
    }
  }, []);

  //props:
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  //methods:
  //called after successful login:
  const login = (email, token) => {
    setEmail(email);
    setToken(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(undefined);
    setEmail(undefined);
  };

  return (
    <>
      <AuthContext.Provider
        value={{ isLoggedIn, token, email, login, logout }}
      >
        {props.children}
      </AuthContext.Provider>
    </>
  );
};
export { AuthContextProvider, AuthContext };
export default AuthContext;
