import {createSlice} from "@reduxjs/toolkit";
import * as ResponseModel from "./models/response";
import {GetCountries} from "./middleware";
import {CoreInitialState} from "../../../Models/CoreInitialState";

const initialState = {
    ...CoreInitialState,
    data: ResponseModel.Type === "ArrayOfObject" ? [ResponseModel.Model] : ResponseModel.Model,
};

const reducers = {
    // Local Data Reducers
};

function extraReducers(builder) {
    builder
    .addCase(GetCountries.pending, (state, action) => {
        state.status = "loading";
    })
    .addCase(GetCountries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
    })
    .addCase(GetCountries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
    });
}

export const Countries = createSlice({
    name: "Countries",
    initialState,
    reducers: {...reducers},
    extraReducers,
});

const selectCountries = (state) => state.Common.Countries;

export default Countries.reducer;

export {selectCountries};
