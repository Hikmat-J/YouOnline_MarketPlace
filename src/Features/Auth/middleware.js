import {createAsyncThunk} from "@reduxjs/toolkit";
import * as http from "../../Services/http";
import * as app from "../../Services/app";

export const SignInApi = createAsyncThunk("SignIn/fetchData", async (model, {rejectWithValue}) => {
    const response = await http.Post("/user/weblogin/", model, {}, true);
    return response;
    // app.ChangeLinesSpinnerStatus(true);
    // return await http
    // .Post("/user/weblogin/", model, {}, true)
    // .then((response) => {
    //     app.ChangeLinesSpinnerStatus(false);
    //     return response;
    // })
    // .catch((err) => {
    //     app.ShowTopMessageAlert(err.response.data.Error,'','danger');
    //     app.ChangeLinesSpinnerStatus(false);
    //     console.log('err :>> ', err);
    //     return err;
    // });
});

export const SignUpApi = createAsyncThunk("SignUp/fetchData", async (model, {}) => {
    const response = await http.Post("/user/webregister/", model, {}, true);
    return response;
});
