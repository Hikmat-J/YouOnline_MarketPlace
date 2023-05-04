import {createAsyncThunk} from "@reduxjs/toolkit";
import * as http from "../../../Services/http";

export const GetCountries = createAsyncThunk("Countries/fetchData", async (_, {rejectWithValue}) => {
    const response = await http.Get("/user/countries/");
    return response;
    // .then((response) => {
    //     return response;
    // })
    // .catch((_err) => {
    //     return rejectWithValue(_err.message);
    // });
});
