import {createSlice} from "@reduxjs/toolkit";
import * as ResponseModel from "./models/response";
import {GetFeaturedProperties} from "./middleware";
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
    .addCase(GetFeaturedProperties.pending, (state, action) => {
        state.status = "loading";
    })
    .addCase(GetFeaturedProperties.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
    })
    .addCase(GetFeaturedProperties.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
    });
}

const FeaturedPropertySlice = createSlice({
    name: "FeaturedProperty",
    initialState,
    reducers: {...reducers},
    extraReducers,
});

const selectFeaturedProperty = (state) => {
    return state.Property.Featured;
};

export default FeaturedPropertySlice.reducer;

export {selectFeaturedProperty, FeaturedPropertySlice};
