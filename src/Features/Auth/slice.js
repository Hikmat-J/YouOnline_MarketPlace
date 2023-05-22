import {createSlice} from "@reduxjs/toolkit";
import {SignInApi, SignUpApi} from "./middleware";
import * as ResponseModel from "./models/response";
import {CoreInitialState} from "../../Models/CoreInitialState";
import * as app from "../../Services/app";

const initialState = {
    ...CoreInitialState,
    loginState: {
        userType: -1,
    },
    route: "default",
    data: ResponseModel.Type === "ArrayOfObject" ? [ResponseModel.Model] : ResponseModel.Model,
};

const reducers = {
    changeLoginState: (state, action) => {
        state.route = action.payload;
    },
};

function extraReducers(builder) {
    builder
    .addCase(SignInApi.pending, (state, action) => {
        state.status = "loading";
    })
    .addCase(SignInApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        app.setCookie("jwt-Auzhorization", action.payload.token.token);
        state.loginState = {userType: 1};
    })
    .addCase(SignInApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
    })
    .addCase(SignUpApi.pending, (state, action) => {
        state.status = "loading";
    })
    .addCase(SignUpApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        app.setCookie("jwt-Auzhorization", action.payload.token.token);
        state.loginState = {userType: 1};
    })
    .addCase(SignUpApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
    });
}

const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {...reducers},
    extraReducers,
});

const selectAuth = (state) => {
    return state.Auth;
};

export const {changeLoginState} = authSlice.actions;

export default authSlice.reducer;

export {selectAuth, authSlice};
