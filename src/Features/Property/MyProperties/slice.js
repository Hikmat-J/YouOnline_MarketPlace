import {createSlice} from "@reduxjs/toolkit";
import * as ResponseModel from "./models/response";
import {GetMyProperties} from "./middleware";
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
    .addCase(GetMyProperties.pending, (state, action) => {
        state.status = "loading";
    })
    .addCase(GetMyProperties.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
    })
    .addCase(GetMyProperties.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
    });
}

const MyPropertySlice = createSlice({
    name: "MyProperty",
    initialState,
    reducers: {...reducers},
    extraReducers,
});

const selectMyProperty = (state) => {
    return state.Property.MyProperties;
};

export default MyPropertySlice.reducer;

export {selectMyProperty, MyPropertySlice};
