import { initialState } from "./common";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfileDetail = createAsyncThunk(
  "getProfile/getProfileDetail",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/employee/single`,
        {
          withCredentials: true,
        }
      );
      if (!response.data.success) {
        console.error("Invalid");
      }
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error?.message || "An error occurred";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
export const getAllProfileDetail = createAsyncThunk(
  "getProfile/getAllProfileDetail",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/employee/all`,
        {
          withCredentials: true,
        }
      );
      if (!response.data.success) {
        console.error("Invalid");
      }
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error?.message || "An error occurred";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getUserProfile = createSlice({
  name: "getProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfileDetail.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(getProfileDetail.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.userDetails = payload;
      state.isError = null;
    });
    builder.addCase(getProfileDetail.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload || "unknown error";
    });
    builder.addCase(getAllProfileDetail.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
    });
    builder.addCase(getAllProfileDetail.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.getAllProfiles = payload.allDetails;
      state.isError = null;
    });
    builder.addCase(getAllProfileDetail.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload || "unknown error";
    });
  },
});

export default getUserProfile.reducer;
