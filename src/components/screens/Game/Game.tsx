import "./Game.css";
import Steps from "../../Steps/Steps";
import { useDispatch, useSelector } from "react-redux";
import { Store, Option } from "../../../model/interfaces";
import useHandleAnswer from "../../../hooks/useHandleAnswer";
import { ReactComponent as Menu } from "../../../assets/Menu.svg";
import { setIsMenuOpen, setIsOptionSelected } from "../../../store/gameSlice";

const Game = () => {
  const dispatch = useDispatch();
  const handleAnswer = useHandleAnswer();
  const currentStep = useSelector((state: Store) => state.game.step);
  const question = useSelector((state: Store) => state.game.question);
  const questions = useSelector((state: Store) => state.game.questions);
  const answerOptions = useSelector((state: Store) => state.game.answerOptions);
  const isOptionCorrect = useSelector((state: Store) => state.game.isOptionCorrect);
  const isOptionSelected = useSelector((state: Store) => state.game.isOptionSelected);

  const openMenu = () => dispatch(setIsMenuOpen(true));

  const handleClick = () => {
    const correctAnswer: string | string[] = questions[currentStep].rightAnswer;

    // disable all button after answer was selected for one "correctAnswer"
    dispatch(setIsOptionSelected(true));
    if (!Array.isArray(correctAnswer)) {
      document.querySelectorAll(".options__option").forEach((el: any) => {
        el.setAttribute("disabled", "true");
      });
    }
    // handleAnswer();
  };

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
                onClick={handleClick}
                className={
                  `options__option 
                    ${isOptionCorrect ? "options__option_correct" : ""}
                    ${isOptionSelected ? "options__option_selected" : ""}
                  `
                }
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
