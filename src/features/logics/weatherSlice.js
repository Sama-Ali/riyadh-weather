import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async () => {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=4f8f3e042a291c506b6074a175006a36"
    );

    const city = response.data.name;
    const temp = Math.round(response.data.main.temp - 272.15);
    const description = response.data.weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
    const min = Math.round(response.data.main.temp_min - 272.15);
    const max = Math.round(response.data.main.temp_max - 272.15);

    return { city, temp, description, icon, min, max };
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    value: "the value",
    isLoading: false,
    weather: {},
  },
  reducers: {
    updateWeather: (state, action) => {
      console.log("action: ", action);
      state.value = "Updated the value";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        console.log(
          "pendinggggg: ",
          action,
          "state: ",
          state,
          "isLoading: ",
          state.isLoading
        );
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        console.log("fulfilled: ", action);
        state.isLoading = false;
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        console.log("rejected: ", action);
        state.isLoading = false;
      });
  },
});

export const { updateWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
