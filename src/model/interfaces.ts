export interface Store {
  game: GameState
}

export interface GameState {
  step: number,
  steps: string[],
  isMenuOpen: boolean
  totalScore: string
  currentScreen: string
  question: string
  answerOptions: Option[]
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