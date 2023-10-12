import "./Steps.css";
import { useSelector, useDispatch } from "react-redux";
import { setIsMenuOpen } from "../../store/gameSlice";
import { ReactComponent as Close } from "../../assets/Close-menu.svg";
import { StepsProps } from "../../model/interfaces";

const Steps = ({ steps }: StepsProps) => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state: any) => state.game.step);
  const isMenuOpen = useSelector((state: any) => state.game.isMenuOpen);

  const closeMenu = () => dispatch(setIsMenuOpen(false));

  return (
    <div className={`steps ${isMenuOpen ? "steps_open" : ""}`}>
      <button type="button" onClick={closeMenu} className="steps__close-btn">
        <Close />
      </button>

      {steps.map((step: string, i: number) => {
        const length = steps.length - 1;
        const isActive = length - currentStep === i;
        const isInactive =
          length - currentStep < length && length - currentStep < i;

        return (
          <span
            key={step}
            className={`steps__item ${
              isActive
                ? "steps__item_active"
                : isInactive
                ? "steps__item_inactive"
                : ""
            }`}
          >
            {step}
          </span>
        );
      })}
    </div>
  );
};

export default Steps;
