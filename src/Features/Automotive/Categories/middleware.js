import * as http from "../../../Services/http";
import * as app from "../../../Services/app";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const GetAutomotiveCategories = createAsyncThunk("GetAutomotiveCategories/fetchData", async () => {
    ;
    const response = await http.Get("/auto/webcats/");
    app.ChangeLinesSpinnerStatus(false);
    return response;
});
