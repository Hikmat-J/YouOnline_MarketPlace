import * as http from "../../../../Services/http";
import * as app from "../../../../Services/app";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const GetFeaturedBrands = createAsyncThunk("GetFeaturedBrands/fetchData", async () => {
    app.ChangeLinesSpinnerStatus(true);
    const response = await http.Get("/auto/brands/home");
    app.ChangeLinesSpinnerStatus(false);
    return response;
});
