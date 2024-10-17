import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  "https://take-home-test-api.nutech-integrasi.com/transaction/history";

export const getTransactionHistory = createAsyncThunk(
  "transactions/getTransactionHistory",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}?offset=0&limit=3`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data.data.records;
    } catch (error) {
      return rejectWithValue(error.response.data.data.records);
    }
  }
);
const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    history: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactionHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(getTransactionHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default transactionSlice.reducer;
