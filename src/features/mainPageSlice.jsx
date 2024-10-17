// Example of your mainPageSlice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProfile = createAsyncThunk(
  "mainPage/fetchProfile",
  async (token) => {
    const response = await axios.get(
      "https://take-home-test-api.nutech-integrasi.com/profile",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  }
);


export const updateProfile = createAsyncThunk(
  "profile/update",
  async ({ token, updatedProfileData }) => {
    const response = await axios.put(
      "https://take-home-test-api.nutech-integrasi.com/profile/update",
      updatedProfileData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  }
);

export const fetchBalance = createAsyncThunk(
  "mainPage/fetchBalance",
  async (token) => {
    const response = await axios.get(
      "https://take-home-test-api.nutech-integrasi.com/balance",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data.data.balance;
  }
);

export const fetchBanner = createAsyncThunk(
  "mainPage/fetchBanner",
  async (token) => {
    const response = await axios.get(
      "https://take-home-test-api.nutech-integrasi.com/banner",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  }
);
export const fetchServices = createAsyncThunk(
  "mainPage/fetchServices",
  async (token) => {
    const response = await axios.get(
      "https://take-home-test-api.nutech-integrasi.com/services",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
);

const mainPageSlice = createSlice({
  name: "mainPage",
  initialState: {
    profile: null,
    balance: null,
    services: [],
    banner: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.profile = payload.data;
      })
      .addCase(fetchProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;

        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
        state.loading = false;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.banner = action.payload.data;
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.services = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default mainPageSlice.reducer;
