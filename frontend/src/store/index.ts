import { configureStore } from "@reduxjs/toolkit";

const emptyReducer = (state = {}) => state;

export const store = configureStore({
  reducer: {
    empty: emptyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
