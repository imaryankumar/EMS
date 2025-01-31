import { configureStore } from "@reduxjs/toolkit";
import getUserProfile from "./userDetailSlice/userDetailSlice";
import getUtilsData from "./utilsData/utilsDataSlice";

export const store = configureStore({
  reducer: {
    getProfileDetail: getUserProfile,
    utilsData: getUtilsData,
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
