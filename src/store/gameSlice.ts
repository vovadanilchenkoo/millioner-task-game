import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { GameState } from './../model/interfaces';

const initialState: GameState = {
  step: 0,
  totalScore: '$0',
  isMenuOpen: false,
  currentScreen: 'start'
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
    }
  },
});

export const { setStep, setIsMenuOpen, setTotalScore, setCurrentScreen, setInitialGameState } = gameSlice.actions;

export default gameSlice.reducer;