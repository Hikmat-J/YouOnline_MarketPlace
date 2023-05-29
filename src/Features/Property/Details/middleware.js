import * as http from "../../../Services/http";
import * as app from "../../../Services/app";
import {createAsyncThunk} from "@reduxjs/toolkit";

export async function GetPropertyById(propertyId) {
    const response = await http
    .Get("/prop/proprety/view/" + propertyId)
    .catch((err) => {
        app.ShowTopMessageAlert(err.response.data.Error, "", "danger");
        app.ChangeLinesSpinnerStatus(false);
        return err;
    });
    app.ChangeLinesSpinnerStatus(false);
    return response;
}
