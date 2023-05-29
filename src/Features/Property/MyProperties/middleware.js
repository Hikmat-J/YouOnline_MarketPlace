import * as http from "../../../Services/http";
import * as app from "../../../Services/app";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const GetMyProperties = createAsyncThunk("GetMyProperties/fetchData", async () => {
    const response = await http.Get("/prop/proprety/myprop/");
    return response;
});
