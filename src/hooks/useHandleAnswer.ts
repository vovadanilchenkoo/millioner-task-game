import { useRef } from "react";
import data from "../gameConfig.json";
import { useDispatch, useSelector } from "react-redux";
import { Store, Option, Question } from "../model/interfaces";
import {
  setStep,
  setQuestion,
  setTotalScore,
  setAnswerOptions,
  setCurrentScreen,
} from "../store/gameSlice";

const useHandleAnswer = (e: React.SyntheticEvent) => {
  const dispatch = useDispatch();
  const answersRef = useRef<string[]>([]);
  const currentStep = useSelector((state: Store) => state.game.step);

  // helper function be on time to highlight selected/correct/wrong answer css state for user
  // without helper this css state will instantly change
  const delayStateTransition = (cb: () => void, ms: number) =>
    new Promise((resolve) => setTimeout(() => resolve(cb()), ms));

  const checkAnswer = (
    e: React.SyntheticEvent,
    answer: string,
    correctAnswer: string | string[],
    currentStepValue: string,
  ) => {
    const DISPLAY_CSS_CLASS_TIME: number = 600;
    const CHANGE_SCREEN_TIME: number = 2000;

    const isFinish = ():boolean => data.questions.length - 1 === currentStep;

    const changeScreen = (nextQuestion: string, nextOptions: Option[]) => {
      dispatch(setQuestion(nextQuestion));
      dispatch(setAnswerOptions(nextOptions));
      dispatch(setStep(currentStep + 1));
      dispatch(setTotalScore(currentStepValue));
    };

    const setCorrectCssClass = () => {
        const target = e.target as HTMLElement;
        target.classList.remove("options__option_selected");
        target.classList.add("options__option_correct");
    };

    const showGameOverScreen = () => {
        const target = e.target as HTMLElement;
        target.classList.remove("options__option_selected");
        target.classList.add("options__option_wrong");

        const changeScreen = () => dispatch(setCurrentScreen("over"));
        delayStateTransition(changeScreen, CHANGE_SCREEN_TIME);
    };

    const checkIfUserWin = () => {
      console.log('checkIfUserWin')
      // after last question answered right, show GameOver screen
      if (isFinish()) {
        delayStateTransition(setCorrectCssClass, DISPLAY_CSS_CLASS_TIME);

        const changeScreen = () => dispatch(setCurrentScreen("over"));
        delayStateTransition(changeScreen, CHANGE_SCREEN_TIME);
      }
    };

    const handleCorrectAnswer = () => {
      const nextStep = (isFinish()) ? 0 : currentStep + 1;
      const nextQuestion: string = data.questions[nextStep].question;
      const nextOptions: Option[] = data.questions[nextStep].options;

      delayStateTransition(
        changeScreen.bind(null, nextQuestion, nextOptions),
        CHANGE_SCREEN_TIME
      );
      checkIfUserWin();
    };

    if (Array.isArray(correctAnswer)) {
      // for multiple correct answers
      if (correctAnswer.includes(answer)) {
        delayStateTransition(setCorrectCssClass, DISPLAY_CSS_CLASS_TIME);
        answersRef.current = [...answersRef.current, answer];

        if (answersRef.current.length === correctAnswer.length) handleCorrectAnswer();
      } else {
        showGameOverScreen();
      }
    } else {
      // for one correct answer
      if (answer === correctAnswer) {
        delayStateTransition(setCorrectCssClass, DISPLAY_CSS_CLASS_TIME);
        handleCorrectAnswer();
      } else {
        showGameOverScreen();
      }
    }
  };

  const handleAnswer = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLElement;
    const answer: string = target.innerText.replace(/.*\s/, "");
    const stepsLength: number = data.steps.length - 1;
    const currentQuestion: Question = data.questions[currentStep];
    const correctAnswer: string | string[] = currentQuestion.rightAnswer as string;
    const currentStepValue: string = data.steps[stepsLength - currentStep];

    // disable all button after answer was selected for one "correctAnswer"
    if (!Array.isArray(correctAnswer)) {
      document.querySelectorAll(".options__option").forEach((el: any) => {
          el.setAttribute("disabled", "true");
      });
    }

    target.classList.add("options__option_selected");

    checkAnswer(e, answer, correctAnswer, currentStepValue);
  };
  handleAnswer(e);
};

export default useHandleAnswer;