import {createAsyncThunk} from "@reduxjs/toolkit";
import * as http from "../../Services/http";
import * as app from "../../Services/app";
export const SignIn = createAsyncThunk("SignIn/fetchData", async (model, {rejectWithValue}) => {
    app.ChangeLinesSpinnerStatus(true);
    const response = await http.Post("/user/weblogin/", model, {}, true);
    app.ChangeLinesSpinnerStatus(false);
    return response;
});

export const SignUp = createAsyncThunk("SignUp/fetchData", async (model, {rejectWithValue}) => {
    app.ChangeLinesSpinnerStatus(true);
    const response = await http.Post("/user/webregister/", model, {}, true);
    app.ChangeLinesSpinnerStatus(false);
    return response;
});
