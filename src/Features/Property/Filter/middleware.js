import * as http from "../../../Services/http";
import * as app from "../../../Services/app";
import * as ApiQuery from "../../../Services/APIProcessing";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const FilterPropertiesApi = createAsyncThunk("FilterPropertiesApi", async (model) => {
    const response = await http.Post("/prop/proprety/filter/", model, {}, true);
    return response;
});
