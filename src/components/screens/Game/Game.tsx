import "./Game.css";
import Steps from "../../Steps/Steps";
import { useDispatch, useSelector } from "react-redux";
import { setIsMenuOpen } from "../../../store/gameSlice";
import { Store, Option } from "../../../model/interfaces";
import useHandleAnswer from "../../../hooks/useHandleAnswer";
import { ReactComponent as Menu } from "../../../assets/Menu.svg";

const Game = () => {
  const dispatch = useDispatch();
  const question = useSelector((state: Store) => state.game.question);
  const answerOptions = useSelector((state: Store) => state.game.answerOptions);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const handleAnswer = (e: React.SyntheticEvent) => useHandleAnswer(e);

  const handleOption = (e: React.SyntheticEvent) => useHandleAnswer(e);

  const openMenu = () => dispatch(setIsMenuOpen(true));

  return (
    <>
      <div className="game">
        <div className="game-top-content">
          <h2 className="game__question">{question}</h2>
          <button type="button" onClick={openMenu} className="game__burger-btn">
            <Menu />
          </button>
        </div>
        <div
          className={`options ${
            answerOptions.length > 4 ? "options_multiple" : ""
          }`}
        >
          <div className="options-inner">
            {answerOptions.map((option: Option, i: number) => (
              <button
                type="button"
                onClick={(e) => handleOption(e)}
                className="options__option"
                key={`${option.option} ${i}`}
              >
                <span className="options__option-letter">
                  {option.optionLetter.toUpperCase()}
                </span>
                {option.option}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Steps />
    </>
  );
};

export default Game;
