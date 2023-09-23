import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import settingsReducer from "./features/settings/settingsSlice";
import quotidienReducer from "./features/quotidien/quotidienSlice";
import engagementReducer from "./features/engagement/engagementSlice";
import financeReducer from "./features/finance/financeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
    quotidien: quotidienReducer,
    engagement: engagementReducer,
    finances: financeReducer,
  },
});
