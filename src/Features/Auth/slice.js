import { createSlice } from "@reduxjs/toolkit";
import * as ResponseModel from "./models/response";
import { SignIn, SignUp } from "./middleware";
import { CoreInitialState } from "../../Models/CoreInitialState";
import * as app from '../../Services/app'

const initialState = {
    ...CoreInitialState,
    loginState: {
        userType: -1,
    },
    route: 'default',
    data: ResponseModel.Type === "ArrayOfObject" ? [ResponseModel.Model] : ResponseModel.Model,
};

const reducers = {
    // Local Data Reducers
    changeLoginState: (state, action) => {
        state.route = action.payload
    }
};

function extraReducers(builder) {
    builder
        .addCase(SignIn.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(SignIn.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            app.setCookie('jwt-Auzhorization', action.payload.token.token)
            state.loginState = { userType: 1 };
        })
        .addCase(SignIn.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(SignUp.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(SignUp.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            app.setCookie('jwt-Auzhorization', action.payload.token.token)
            state.loginState = { userType: 1 };
        })
        .addCase(SignUp.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
}

const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: { ...reducers },
    extraReducers,
});

const selectAuth = (state) => {
    return state.Auth;
};

export const { changeLoginState } = authSlice.actions
export default authSlice.reducer;

export { selectAuth, authSlice };
