// features/store.js

import { configureStore } from '@reduxjs/toolkit';
import expenseTrackReducer from './expenseTrackSlice';

const store = configureStore({
  reducer: {
    expenseTrack: expenseTrackReducer
  }
});

export default store;
