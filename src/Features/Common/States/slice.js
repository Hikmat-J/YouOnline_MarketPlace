import {createSlice} from "@reduxjs/toolkit";
import * as ResponseModel from "./models/response";
import {GetStates} from "./middleware";
import {CoreInitialState} from "../../../Models/CoreInitialState";

const initialState = {
    ...CoreInitialState,
    data: ResponseModel.Type === "ArrayOfObject" ? [ResponseModel.Model] : ResponseModel.Model,
};

const reducers = {
    // Local Data Reducers
};

function extraReducers(builder) {
    builder
    .addCase(GetStates.pending, (state, action) => {
        state.status = "loading";
    })
    .addCase(GetStates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
    })
    .addCase(GetStates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
    });
}

export const States = createSlice({
    name: "States",
    initialState,
    reducers: {...reducers},
    extraReducers,
});

const selectStates = (state) => state.Common.States;

export default States.reducer;

export {selectStates};
