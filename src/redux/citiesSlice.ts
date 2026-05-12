import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface City {
  id: number;
  cityName: string;
  emoji: string;
  position: {
    lat: number;
    lng: number;
  };
}

interface CitiesState {
  cities: City[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CitiesState = {
  cities: [],
  isLoading: false,
  error: null,
};

export const fetchCities = createAsyncThunk("cities/fetchCities", async () => {
  const response = await fetch("http://localhost:9000/cities");
  if (!response.ok) {
    throw new Error("Failed to fetch cities");
  }
  const data = await response.json();
  return data as City[];
});

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchCities.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }).addCase(fetchCities.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cities = action.payload;
    }).addCase(fetchCities.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch cities";
    });
  },
});

export default citiesSlice.reducer;