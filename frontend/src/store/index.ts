import { configureStore } from "@reduxjs/toolkit";
import getUserProfile from "./userDetailSlice/userDetailSlice"


export const store = configureStore({
  reducer: {
    getProfileDetail:getUserProfile ,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["*"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
