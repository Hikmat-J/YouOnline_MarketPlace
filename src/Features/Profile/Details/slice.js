import {createSlice} from "@reduxjs/toolkit";
import * as ResponseModel from "./models/response";
import {GetProfileDetails, UpdateImage, UpdateProfileDetails} from "./middleware";
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
    .addCase(GetProfileDetails.pending, (state, action) => {
        state.status = "loading";
    })
    .addCase(GetProfileDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        // let phone = action.payload.code + action.payload.phone;
        state.data = action.payload;
    })
    .addCase(GetProfileDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
    })
    .addCase(UpdateImage.pending, (state, action) => {
        state.status = "loading";
    })
    .addCase(UpdateImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
    })
    .addCase(UpdateImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
    })
    .addCase(UpdateProfileDetails.pending, (state, action) => {
        state.status = "loading";
    })
    .addCase(UpdateProfileDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        // let phone = action.payload.code + action.payload.phone;
        state.data = action.payload;
    })
    .addCase(UpdateProfileDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
    });
}

const ProfileDetailsSlice = createSlice({
    name: "ProfileDetails",
    initialState,
    reducers: {...reducers},
    extraReducers,
});

const selectProfile = (state) => {
    return state.Profile;
};

export default ProfileDetailsSlice.reducer;

export {selectProfile, ProfileDetailsSlice};
