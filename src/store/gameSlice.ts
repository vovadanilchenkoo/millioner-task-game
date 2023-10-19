import data from '../gameConfig.json';
import { Option } from "../model/interfaces";
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { GameState } from './../model/interfaces';

const initialState: GameState = {
  step: 0,
  totalScore: '$0',
  steps: data.steps,
  isMenuOpen: false,
  currentScreen: 'start',
  question: data.questions[0].question,
  answerOptions: data.questions[0].options,
};

export const gameSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMenuOpen = action.payload;
    },
    setTotalScore: (state, action: PayloadAction<string>) => {
      state.totalScore = action.payload;
    },
    setCurrentScreen: (state, action: PayloadAction<string>) => {
      state.currentScreen = action.payload;
    },
    setInitialGameState: (state) => {
      state.step = 0;
      state.totalScore = '$0';
      state.isMenuOpen = false;
      state.currentScreen = 'start';
    },
    setQuestion: (state, action: PayloadAction<string>) => {
      state.question = action.payload;
    },
    setAnswerOptions: (state, action: PayloadAction<Option[]>) => {
      state.answerOptions = action.payload;
    }
  },
});

export const {
  setStep,
  setQuestion,
  setIsMenuOpen,
  setTotalScore,
  setCurrentScreen,
  setAnswerOptions,
  setInitialGameState
} = gameSlice.actions;

export default gameSlice.reducer;