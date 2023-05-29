import {createSlice} from "@reduxjs/toolkit";
import * as ResponseModel from "./models/response";
import {PropertyMinMaxApi} from "./middleware";
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
    .addCase(PropertyMinMaxApi.pending, (state, action) => {
        state.status = "loading";
    })
    .addCase(PropertyMinMaxApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
    })
    .addCase(PropertyMinMaxApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
    });
}

const PropertyMinMaxSlice = createSlice({
    name: "PropertyMinMax",
    initialState,
    reducers: {...reducers},
    extraReducers,
});

const selectPropertyMinMax = (state) => {
    return state.Property.MinMax;
};

export default PropertyMinMaxSlice.reducer;

export {selectPropertyMinMax, PropertyMinMaxSlice};
