export interface Store {
  game: GameState
}

export interface GameState {
  step: number
  isMenuOpen: boolean
  totalScore: string
  currentScreen: string
};

export interface Question {
  question: string;
  options: Option[];
  rightAnswer: string | string[];
}

export interface Option {
  option: string;
  optionLetter: string;
};

export interface StepsProps {
  steps: string[];
};