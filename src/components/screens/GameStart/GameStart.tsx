import "./GameStart.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentScreen, setInitialGameState } from "../../../store/gameSlice";
import { ReactComponent as ThumbUp } from "../../../assets/thumb-up.svg";

const GameStart = () => {
  const dispatch = useDispatch();
  const startGame = () => dispatch(setCurrentScreen("game"));

  useEffect(() => {
    dispatch(setInitialGameState());
  }, []);

  return (
    <div className="game-start">
      <ThumbUp className="thumb-up" />
      <div className="game-content">
        <h1 className="game-content__title">Who wants to be a millionaire?</h1>
        <button
          type="button"
          onClick={startGame}
          className="action-button game-content__start"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default GameStart;
