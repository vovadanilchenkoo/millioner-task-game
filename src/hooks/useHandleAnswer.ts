import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store, Option, Question } from "../model/interfaces";
import {
  setStep,
  setQuestion,
  setTotalScore,
  setAnswerOptions,
  setCurrentScreen,
  setIsOptionCorrect,
  setIsOptionSelected
} from "../store/gameSlice";

const useHandleAnswer = () => {
  const CHANGE_SCREEN_TIME: number = 2000;
  const DISPLAY_CSS_CLASS_TIME: number = 600;

  const dispatch = useDispatch();
  const answersRef = useRef<string[]>([]);
  const steps = useSelector((state: Store) => state.game.steps);
  const currentStep = useSelector((state: Store) => state.game.step);
  const questions = useSelector((state: Store) => state.game.questions);
  const target = useSelector((state: Store) => state.game.clickedOptionElement);
  const answer: string = target!.innerText.replace(/.*\s/, ""); // TODO: can be handled in event handler
  const stepsLength: number = steps.length - 1;
  const currentQuestion: Question = questions[currentStep];
  const currentStepValue: string = steps[stepsLength - currentStep];
  const correctAnswer: string | string[] = currentQuestion.rightAnswer as string;

  // helper function be on time to highlight selected/correct/wrong answer css state for user
  // without helper this css state will instantly change
  const delayStateTransition = (cb: () => void, ms: number) =>
    new Promise((resolve) => setTimeout(() => resolve(cb()), ms));

  const isFinish = ():boolean => questions.length - 1 === currentStep;

  const changeScreen = (nextQuestion: string, nextOptions: Option[]) => {
    dispatch(setQuestion(nextQuestion));
    dispatch(setAnswerOptions(nextOptions));
    dispatch(setStep(currentStep + 1));
    dispatch(setTotalScore(currentStepValue));
  };

  const setCorrectCssClass = () => {
    dispatch(setIsOptionSelected(true));
    dispatch(setIsOptionCorrect(true));
  };

  const showGameOverScreen = () => { 
    target!.classList.remove("options__option_selected"); // TODO: can be handled in event handler
    target!.classList.add("options__option_wrong"); // TODO: can be handled in event handler

    const changeScreen = () => dispatch(setCurrentScreen("over"));
    delayStateTransition(changeScreen, CHANGE_SCREEN_TIME);
  };

  const checkIfUserWin = () => {
    // after last question answered right, show GameOver screen
    if (isFinish()) {
      delayStateTransition(setCorrectCssClass, DISPLAY_CSS_CLASS_TIME);

      const changeScreen = () => dispatch(setCurrentScreen("over"));
      delayStateTransition(changeScreen, CHANGE_SCREEN_TIME);
    }
  };

  const handleCorrectAnswer = () => {
    const nextStep = (isFinish()) ? 0 : currentStep + 1;
    const nextQuestion: string = questions[nextStep].question;
    const nextOptions: Option[] = questions[nextStep].options;

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

export default useHandleAnswer;

// TODO: separate logic to recieve data from event object from
// statefull logic wich calling redux, react