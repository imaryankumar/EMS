import initialState from "./common";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const companyAuthUser = createAsyncThunk(
  "companyAuth/companyAuthUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/company/signup`
      );
      if (!response.data.success) {
        console.error("Invalid");
      }
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message || "An error occurred");
    }
  }
);

export const companyAuthSlice = createSlice({
  name: "companyAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(companyAuthUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(companyAuthUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.companyId = payload;
    });
    builder.addCase(companyAuthUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
    });
  },
});
