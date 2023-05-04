import * as http from "../../../Services/http";
import * as app from "../../../Services/app";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const GetFeaturedAutomotive = createAsyncThunk("GetFeaturedAutomotive/fetchData", async () => {
    app.ChangeLinesSpinnerStatus(true);
    const response = await http.Get("/auto/automotive/home/All");
    app.ChangeLinesSpinnerStatus(false);
    return response;
});
