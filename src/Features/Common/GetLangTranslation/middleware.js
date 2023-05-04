import {createAsyncThunk} from "@reduxjs/toolkit";
import * as http from "../../../Services/http";

// export const GetLangKeys = createAsyncThunk("GetLangTranslation/fetchData", async (langCode) => {
//     const response = await http.Get("/user/lang/" + langCode);
//     return response;
// });

export const GetLangKeys = createAsyncThunk("GetLangTranslation/fetchData", async (model, {rejectWithValue}) => {
    const response = await http.Get("/user/lang/" + model, {}, true);
    return response;
    // .then((response) => {
    //     return response;
    // })
    // .catch((_err) => {
    //     return rejectWithValue(_err.message);
    // });
});
