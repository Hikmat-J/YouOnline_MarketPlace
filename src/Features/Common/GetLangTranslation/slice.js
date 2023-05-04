import {createSlice} from "@reduxjs/toolkit";
import * as ResponseModel from "./models/response";
import {GetLangKeys} from "./middleware";
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
    .addCase(GetLangKeys.pending, (state, action) => {
        state.status = "loading";
    })
    .addCase(GetLangKeys.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
    })
    .addCase(GetLangKeys.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
    });
}

export const GetLangTranslation = createSlice({
    name: "LangKeys",
    initialState,
    reducers: {...reducers},
    extraReducers,
});

const selectLangKeys = (state) => state.Common.LangKeys;

export default GetLangTranslation.reducer;

export {selectLangKeys};
