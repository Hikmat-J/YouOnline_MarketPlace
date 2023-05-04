import * as http from "../../../Services/http";
import * as app from "../../../Services/app";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const GetPropertyByCategory = createAsyncThunk("GetPropertyByCategory/fetchData", async (categoryId) => {
    app.ChangeLinesSpinnerStatus(true);
    const response = await http.Get("/prop/proprety/cat/" + categoryId);
    app.ChangeLinesSpinnerStatus(false);
    return response;
});
