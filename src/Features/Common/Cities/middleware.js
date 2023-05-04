import {createAsyncThunk} from "@reduxjs/toolkit";
import * as http from "../../../Services/http";

export const GetCities = createAsyncThunk("Cities/fetchData", async (stateId, {rejectWithValue}) => {
    const response = await http.Get("/user/states/" + stateId + "/cities/");
    return response;

});
