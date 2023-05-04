import { createSlice } from "@reduxjs/toolkit";
import * as ResponseModel from "./models/response";
import { GetFeaturedAutomotive } from "./middleware";
import { CoreInitialState } from "../../../Models/CoreInitialState";

const initialState = {
    ...CoreInitialState,
    data: ResponseModel.default,
};

const reducers = {
    // Local Data Reducers
};

function extraReducers(builder) {
    builder
        .addCase(GetFeaturedAutomotive.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(GetFeaturedAutomotive.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
        })
        .addCase(GetFeaturedAutomotive.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
}

const FeaturedAutomotiveSlice = createSlice({
    name: "FeaturedAutomotive",
    initialState,
    reducers: { ...reducers },
    extraReducers,
});

const selectFeaturedAutomotive = (state) => {
    return state.Automotive.Featured;
};

export default FeaturedAutomotiveSlice.reducer;

export { selectFeaturedAutomotive, FeaturedAutomotiveSlice };
