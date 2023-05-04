import {createSlice} from "@reduxjs/toolkit";
import * as ResponseModel from "./models/response";
import {GetAutomotiveCategories} from "./middleware";
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
    .addCase(GetAutomotiveCategories.pending, (state, action) => {
        state.status = "loading";
    })
    .addCase(GetAutomotiveCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
    })
    .addCase(GetAutomotiveCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
    });
}

const AutomotiveCategoriesSlice = createSlice({
    name: "AutomotiveCategories",
    initialState,
    reducers: {...reducers},
    extraReducers,
});

const selectAutomotiveCategories = (state) => {
    return state.Automotive.Featured;
};

export default AutomotiveCategoriesSlice.reducer;

export {selectAutomotiveCategories, AutomotiveCategoriesSlice};
