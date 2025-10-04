import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API key and base URL
const API_KEY = "4f8f3e042a291c506b6074a175006a36";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Helper function to process weather data
const processWeatherData = (data) => {
  return {
    city: data.name,
    country: data.sys.country,
    temp: Math.round(data.main.temp - 273.15), // Fixed: correct Kelvin to Celsius conversion
    description: data.weather[0].description,
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
    min: Math.round(data.main.temp_min - 273.15),
    max: Math.round(data.main.temp_max - 273.15),
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    pressure: data.main.pressure,
    visibility: data.visibility / 1000, // Convert to km
    sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
    sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
  };
};

// Fetch weather by coordinates
export const fetchWeatherByCoords = createAsyncThunk(
  "weather/fetchWeatherByCoords",
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      return processWeatherData(response.data);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch weather data");
    }
  }
);

// Fetch weather by city name
export const fetchWeatherByCity = createAsyncThunk(
  "weather/fetchWeatherByCity",
  async (cityName, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}`
      );
      return processWeatherData(response.data);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "City not found");
    }
  }
);

// Fetch weather forecast (5 days)
export const fetchWeatherForecast = createAsyncThunk(
  "weather/fetchWeatherForecast",
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      
      // Process forecast data to get daily summaries
      const dailyForecasts = {};
      response.data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!dailyForecasts[date]) {
          dailyForecasts[date] = {
            date,
            temp: Math.round(item.main.temp - 273.15),
            description: item.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
            min: Math.round(item.main.temp_min - 273.15),
            max: Math.round(item.main.temp_max - 273.15),
          };
        }
      });
      
      return Object.values(dailyForecasts).slice(0, 5); // Return next 5 days
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch forecast");
    }
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
