import * as http from "../../../Services/http";
import * as app from "../../../Services/app";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const GetPropertyCategories = createAsyncThunk("GetPropertyCategories/fetchData", async () => {
    app.ChangeLinesSpinnerStatus(true);
    const response = await http.Get("/prop/webcats/");
    app.ChangeLinesSpinnerStatus(false);
    return response;
});
