import initialState from "./common";
import { createSlice } from "@reduxjs/toolkit";

export const getUtilsData = createSlice({
  name: "getUtilsData",
  initialState,
  reducers: {
    setIsWorkModalOpen: (state, { payload }) => {
      state.isWorkModalOpen = payload;
    },
  },
  extraReducers: () => {},
});

export const { setIsWorkModalOpen } = getUtilsData.actions;

export default getUtilsData.reducer;
