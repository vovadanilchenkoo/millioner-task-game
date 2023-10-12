import "./GameOver.css";
import { Store } from "../../../model/interfaces";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentScreen } from "../../../store/gameSlice";
import { ReactComponent as ThumbUp } from "../../../assets/thumb-up.svg";

const GameOver = () => {
  const dispatch = useDispatch();
  const totalScore = useSelector((state: Store) => state.game.totalScore);

  const tryAgain = () => dispatch(setCurrentScreen("start"));

  return (
    <div className="game-over">
      <ThumbUp className="thumb-up" />
      <div className="game-content">
        <h3 className="game-content__subtitle">Total score:</h3>
        <h1 className="game-content__title">{totalScore} earned</h1>
        <button
          type="button"
          onClick={tryAgain}
          className="action-button game-content__start"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

export default GameOver;
