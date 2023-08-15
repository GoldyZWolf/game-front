import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GameContext from "../contexts/GameContext";

const GamesDetails = () => {
  const nav = useNavigate();

  //1) get the id from the nav params
  const { id } = useParams();
  //2) get the games from GameContext
  const { games } = useContext(GameContext);
  //3) fine the game that matches the given id
  const game = games.find((g) => g.id === Number(id));

  const handleBack = () => {
    nav(-1);
  };
  return (
    <>
      <h2>Game Details</h2>
      <p>{game.title}</p>
      <p>{JSON.stringify(game)}</p>
      <button className="btn btn-outline-info" onClick={handleBack}>
        Back
      </button>
    </>
  );
};

export default GamesDetails;