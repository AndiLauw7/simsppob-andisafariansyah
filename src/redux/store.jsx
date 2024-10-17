import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import mainPageReducer from "../features/mainPageSlice";
import transactionReducer from "../features/transactionSlice";
import riwayatTransaksiReducer from "../features/riwayatTransaksiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mainPage: mainPageReducer,
    topup: transactionReducer,
    transactions: riwayatTransaksiReducer,
  },
});
export default store;
