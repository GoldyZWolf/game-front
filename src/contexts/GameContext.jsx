import { useState, createContext } from "react";

//1)
const initialState = {
 games: [],
 setGames: () => {},
};
//2) create the context:
const GameContext = createContext(initialState);
//3) create the wrapper:
const GameContextProvider = (props) => {
 //state:
 const [games, setGames] = useState([]);
 return (
 <>
 <GameContext.Provider
 value={{ games, setGames }}
 >
 {props.children}
 </GameContext.Provider>
 </>
 );
};
export { GameContextProvider, GameContext };
export default GameContext;