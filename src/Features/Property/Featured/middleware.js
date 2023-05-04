import * as http from "../../../Services/http";
import * as app from "../../../Services/app";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const GetFeaturedProperties = createAsyncThunk("GetFeaturedProperties/fetchData", async () => {
    app.ChangeLinesSpinnerStatus(true);
    const response = await http.Get("/prop/proprety/home/All");
    app.ChangeLinesSpinnerStatus(false);
    return response;
});
