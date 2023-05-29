import {createSlice} from "@reduxjs/toolkit";
import * as ResponseModel from "./models/response";
import {GetPropertyCategoriesWithSub} from "./middleware";
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
    .addCase(GetPropertyCategoriesWithSub.pending, (state, action) => {
        state.status = "loading";
    })
    .addCase(GetPropertyCategoriesWithSub.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
    })
    .addCase(GetPropertyCategoriesWithSub.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
    });
}

const PropertyCategoriesWithSubSlice = createSlice({
    name: "PropertyCategoriesWithSub",
    initialState,
    reducers: {...reducers},
    extraReducers,
});

const selectPropertyCategoriesWithSub = (state) => {
    return state.Property.CategoriesWithSub;
};

export default PropertyCategoriesWithSubSlice.reducer;

export {selectPropertyCategoriesWithSub, PropertyCategoriesWithSubSlice};
