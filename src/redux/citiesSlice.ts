import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface City {
  id: string;
  cityName: string;
  country: string;
  dateVisited: string;
  notes: string;
  emoji: string;
  position: {
    lat: number;
    lng: number;
  };
}

interface CitiesState {
  cities: City[];
  currentCity: City | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CitiesState = {
  cities: [],
  currentCity: null,
  isLoading: false,
  error: null,
};

export const fetchCities = createAsyncThunk("cities/fetchCities", async () => {
  const response = await fetch("http://localhost:9000/cities");
  return (await response.json()) as City[];
});

export const getCity = createAsyncThunk(
  "cities/getCity",
  async (id: string) => {
    const response = await fetch(`http://localhost:9000/cities/${id}`);
    return (await response.json()) as City;
  },
);

export const createCity = createAsyncThunk(
  "cities/createCity",
  async (newCity: Omit<City, "id">) => {
    const response = await fetch("http://localhost:9000/cities", {
      method: "POST",
      body: JSON.stringify(newCity),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return (await response.json()) as City;
  },
);

export const deleteCity = createAsyncThunk(
  "cities/deleteCity",
  async (id: string) => {
    await fetch(`http://localhost:9000/cities/${id}`, {
      method: "DELETE",
    });
    return id;
  },
);

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities = action.payload;
      })
      .addCase(createCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cities.push(action.payload);
      })
      .addCase(getCity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCity = action.payload;
      })
      .addCase(deleteCity.fulfilled, (state, action) => {
        state.isLoading = false;

        state.cities = state.cities.filter(
          (city) => city.id !== action.payload,
        );
        state.currentCity = null;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action: any) => {
          state.isLoading = false;
          state.error = action.error.message || "Something went wrong";
        },
      );
  },
});

export default citiesSlice.reducer;
