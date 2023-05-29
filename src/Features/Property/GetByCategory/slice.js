import {createSlice} from "@reduxjs/toolkit";
import * as ResponseModel from "./models/response";
import {GetPropertyByCategory} from "./middleware";
import {CoreInitialState} from "../../../Models/CoreInitialState";

const initialState = {
    ...CoreInitialState,
    data: ResponseModel.default,
};

const reducers = {
    changeProperties: (state, action) => {
        state.data.Property = action.payload;
    },
    // Local Data Reducers
};

function extraReducers(builder) {
    builder
    .addCase(GetPropertyByCategory.pending, (state, action) => {
        state.status = "loading";
    })
    .addCase(GetPropertyByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
    })
    .addCase(GetPropertyByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
    });
}

const GetPropertyByCategorySlice = createSlice({
    name: "PropertyByCategory",
    initialState,
    reducers: {...reducers},
    extraReducers,
});

const selectGetPropertyByCategory = (state) => {
    return state.Property.Featured;
};

export const {changeProperties} = GetPropertyByCategorySlice.actions;
export default GetPropertyByCategorySlice.reducer;

export {selectGetPropertyByCategory, GetPropertyByCategorySlice};
