import { createSlice } from "@reduxjs/toolkit";
import * as ResponseModel from "./models/response";
import { GetFeaturedBrands } from "./middleware";
import { CoreInitialState } from "../../../../Models/CoreInitialState";

const initialState = {
    ...CoreInitialState,
    data: ResponseModel.default,
};

const reducers = {
    // Local Data Reducers
};

function extraReducers(builder) {
    builder
        .addCase(GetFeaturedBrands.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(GetFeaturedBrands.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
        })
        .addCase(GetFeaturedBrands.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
}

const FeaturedBrandsSlice = createSlice({
    name: "FeaturedBrands",
    initialState,
    reducers: { ...reducers },
    extraReducers,
});

const selectFeaturedBrands = (state) => {
    return state.Automotive.Brands.Featured;
};

export default FeaturedBrandsSlice.reducer;

export { selectFeaturedBrands, FeaturedBrandsSlice };
