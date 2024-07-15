import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import settingsReducer from "./features/settings/settingsSlice";
import transfertsReducer from "./features/transferts/transfertSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
    transferts: transfertsReducer,
  },
});
