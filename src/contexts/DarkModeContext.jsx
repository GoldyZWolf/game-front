import { createContext, useState } from "react";
import DarkMode from '../styles/DarkMode.css'
//1) initial state with default values:

// const initialState = {
//   darkMode: false,
//   toggleDarkMode: () => {},
// };
//2) create the context:
const DarkModeContext = createContext();

//3) create the wrapper component:
const DarkModeContextProvider = (props) => {
  //props
  const [darkMode, setDarkMode] = useState(false);
  //method:
  const toggleDarkMode = () => {
    setDarkMode((darkMode) => !darkMode);
  };
  return (
    <>
      <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
        {props.children}
      </DarkModeContext.Provider>
    </>
  );
};
export { DarkModeContext, DarkModeContextProvider };
export default DarkModeContext;
