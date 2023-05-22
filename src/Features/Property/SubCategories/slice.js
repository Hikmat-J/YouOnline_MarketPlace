import {createSlice} from "@reduxjs/toolkit";
import * as ResponseModel from "./models/response";
import {GetPropSubCategories} from "./middleware";
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
    .addCase(GetPropSubCategories.pending, (state, action) => {
        state.status = "loading";
    })
    .addCase(GetPropSubCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
    })
    .addCase(GetPropSubCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
    });
}

const PropertySubCategoriesSlice = createSlice({
    name: "PropertySubCategories",
    initialState,
    reducers: {...reducers},
    extraReducers,
});

const selectPropertySubCategories = (state) => {
    return state.Property.SubCategories;
};

export default PropertySubCategoriesSlice.reducer;

export {selectPropertySubCategories, PropertySubCategoriesSlice};
