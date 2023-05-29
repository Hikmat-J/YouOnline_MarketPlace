import * as http from "../../../Services/http";
import * as app from "../../../Services/app";
import * as ApiQuery from "../../../Services/APIProcessing";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const PropertyMinMaxApi = createAsyncThunk("PropertyMinMax", async () => {
    const response = await http.Get("/prop/proprety/maxmin/");
    return response;
});
