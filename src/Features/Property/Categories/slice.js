import {createSlice} from "@reduxjs/toolkit";
import * as ResponseModel from "./models/response";
import {GetPropertyCategories} from "./middleware";
import {CoreInitialState} from "../../../Models/CoreInitialState";

const initialState = {
    ...CoreInitialState,
    data: ResponseModel.default,
};

const reducers = {
    // Local Reducer
};

function extraReducers(builder) {
    builder
    .addCase(GetPropertyCategories.pending, (state, action) => {
        state.status = "loading";
    })
    .addCase(GetPropertyCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
    })
    .addCase(GetPropertyCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
    });
}

const PropertyCategoriesSlice = createSlice({
    name: "PropertyCategories",
    initialState,
    reducers: {...reducers},
    extraReducers,
});

const selectPropertyCategories = (state) => {
    return state.Property.Categories;
};

export default PropertyCategoriesSlice.reducer;

export {selectPropertyCategories, PropertyCategoriesSlice};
