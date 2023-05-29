import * as http from "../../../Services/http";
import * as app from "../../../Services/app";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const GetProfileDetails = createAsyncThunk("GetProfileDetails/fetchData", async () => {
    ;
    const response = await http.Get("/user/webprofile/");
    app.ChangeLinesSpinnerStatus(false);
    return response;
});

export const UpdateProfileDetails = createAsyncThunk("UpdateProfileDetails/fetchData", async (model) => {
    ;
    const response = await http.Put("/user/profile/update/", model, {}, true);
    app.ChangeLinesSpinnerStatus(false);
    return response;
});

export const UpdateImage = createAsyncThunk("UpdateImage/fetchData", async (model) => {
    ;
    const response = await http.Put("/user/profile/update/img/", model, {}, true)
    app.ChangeLinesSpinnerStatus(false);
    return response;
});

// export const UpdateProfileDetails = async (model) => {
//     ;
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
//     ;
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
