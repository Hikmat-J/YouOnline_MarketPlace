import * as http from "../../../Services/http";
import * as app from "../../../Services/app";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const GetProfileDetails = createAsyncThunk("GetProfileDetails/fetchData", async () => {
    app.ChangeLinesSpinnerStatus(true);
    const response = await http.Get("/user/webprofile/");
    app.ChangeLinesSpinnerStatus(false);
    return response;
});

export const UpdateProfileDetails = createAsyncThunk("UpdateProfileDetails/fetchData", async (model) => {
    app.ChangeLinesSpinnerStatus(true);
    const response = await http.Put("/user/profile/update/", model, {}, true);
    app.ChangeLinesSpinnerStatus(false);
    return response;
});

export const UpdateImage = createAsyncThunk("UpdateImage/fetchData", async (model) => {
    app.ChangeLinesSpinnerStatus(true);
    const response = await http.Put("/user/profile/update/img/", model, {}, true)
    app.ChangeLinesSpinnerStatus(false);
    return response;
});

// export const UpdateProfileDetails = async (model) => {
//     app.ChangeLinesSpinnerStatus(true);
//     return await http
//     .Put("/user/profile/update/", model, {}, true)
//     .then((resSuccess) => {
//         app.ChangeLinesSpinnerStatus(false);
//         return resSuccess;
//     })
//     .catch((resError) => {
//         return resError;
//     });
// };

// export const UploadImage = async (model) => {
//     app.ChangeLinesSpinnerStatus(true);
//     return await http
//     .Put("/user/profile/update/img/", model, {}, true)
//     .then((resSuccess) => {
//         app.ChangeLinesSpinnerStatus(false);
//         return resSuccess;
//     })
//     .catch((resError) => {
//         return resError;
//     });
// };
