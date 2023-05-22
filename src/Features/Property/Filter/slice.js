import {createSlice} from "@reduxjs/toolkit";
import * as ResponseModel from "./models/response";
import {FilterPropertiesApi} from "./middleware";
import {CoreInitialState} from "../../../Models/CoreInitialState";

const initialState = {
    ...CoreInitialState,
    data: ResponseModel.default,
};

const reducers = {
    // Local Data Reducers
};

function extraReducers(builder) {
    builder
    .addCase(FilterPropertiesApi.pending, (state, action) => {
        state.status = "loading";
    })
    .addCase(FilterPropertiesApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
    })
    .addCase(FilterPropertiesApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
    });
}

const FilterPropertiesSlice = createSlice({
    name: "FilterProperties",
    initialState,
    reducers: {...reducers},
    extraReducers,
});

const selectFilterProperties = (state) => {
    return state.Property.Filter;
};

export default FilterPropertiesSlice.reducer;

export {selectFilterProperties, FilterPropertiesSlice};
