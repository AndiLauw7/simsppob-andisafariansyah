/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const topUp = createAsyncThunk(
  "topup/topUp",
  async ({ top_up_amount, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/topup",
        { top_up_amount },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      const errorMessega =
        error.response?.data?.message ||
        error.message ||
        "error data transaction tip up";
      return rejectWithValue({ message: errorMessega });
    }
  }
);

export const pembayaranBanners = createAsyncThunk(
  "bayarbanner/bayarBanner",
  async (
    { amount: total_amount, service_code, token },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/transaction",
        { service_code: service_code, amount: total_amount },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error processing payment";
      return rejectWithValue({ message: errorMessage });
    }
  }
);

const topupSlice = createSlice({
  name: "topup",
  initialState: {
    loading: false,
    error: null,
    success: null,
    balance: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(topUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(topUp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.balance =
          action.payload.data && action.payload.data.balance
            ? action.payload.data.balance
            : null;
      })
      .addCase(topUp.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "error data transaction tip up";
        state.balance = null;
      })
      .addCase(pembayaranBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(pembayaranBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message; // Assuming the response has a message
        state.balance =
          action.payload.data && action.payload.data.balance
            ? action.payload.data.balance
            : null;
      })
      .addCase(pembayaranBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Error processing payment";
        state.balance = null;
      });
  },
});

export default topupSlice.reducer;
