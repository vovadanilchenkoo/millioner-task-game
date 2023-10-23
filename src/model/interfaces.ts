export interface Store {
  game: GameState
}

export interface GameState {
  step: number
  steps: string[]
  question: string
  totalScore: string
  isMenuOpen: boolean
  currentScreen: string
  questions: Question[]
  answerOptions: Option[]
  isOptionCorrect: boolean
  isOptionSelected: boolean
};

export interface Question {
  question: string
  options: Option[]
  rightAnswer: string | string[]
}

export interface Option {
  option: string
  optionLetter: string
};