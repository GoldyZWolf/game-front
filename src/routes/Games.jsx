import React, { useContext, useEffect } from "react";
import { request } from "../utils/axios-interceptors";
import { useQuery } from "react-query";
import Spinner from "../components/Spinner";
import GameContext from "../contexts/GameContext";
import { useNavigate } from "react-router-dom";
const gamesRequest = () => request({ url: "/games" });

const Games = () => {
  const { isLoading, data: res } = useQuery("get-games", gamesRequest);
  const { setGames } = useContext(GameContext);

  const nav = useNavigate();

  useEffect(() => {
    if (res && res.data) {
      setGames(res.data);
    }
  }, [res, setGames]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleGameClicked = (e) => {
    // e = event, e.target = the element that triggered the event.
    const gameId = e.target.id;
    nav(`/games/${gameId}`);
  };

  return (
    <>
      <h2>Games</h2>
      {res &&
        res.data &&
        res.data.map((item) => {
          return (
            <div onClick={handleGameClicked} key={item.id} id={item.id}>
              {item.title}
            </div>
          );
        })}
    </>
  );
};
export default Games;
