import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/logics/weatherSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
