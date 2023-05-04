import {createAsyncThunk} from "@reduxjs/toolkit";
import * as http from "../../../Services/http";

export const GetStates = createAsyncThunk("States/fetchData", async (countryId, {rejectWithValue}) => {
    const response = await http.Get("/user/countries/" + countryId + "/states/");
    return response;
    // .then((response) => {
    //     return response;
    // })
    // .catch((_err) => {
    //     return rejectWithValue(_err.message);
    // });
});
