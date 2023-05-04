import { createSlice } from "@reduxjs/toolkit";
import * as ResponseModel from "./models/response";
import { GetCities } from "./middleware";
import { CoreInitialState } from "../../../Models/CoreInitialState";

const initialState = {
  ...CoreInitialState,
  data:
    ResponseModel.Type === "ArrayOfObject"
      ? [ResponseModel.Model]
      : ResponseModel.Model,
};

const reducers = {
  // Local Data Reducers
};

function extraReducers(builder) {
  builder
    .addCase(GetCities.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(GetCities.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    })
    .addCase(GetCities.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error;
    });
}

export const Cities = createSlice({
  name: "Cities",
  initialState,
  reducers: { ...reducers },
  extraReducers,
});

const selectCities = (state) => state.Common.Cities;

export default Cities.reducer;

export { selectCities };
