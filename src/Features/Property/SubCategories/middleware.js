import * as http from "../../../Services/http";
import * as app from "../../../Services/app";
import * as ApiQuery from "../../../Services/APIProcessing";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {SetData, SetError, SetLoading, selectPropertyCategories} from "./slice";
import {useDispatch, useSelector} from "react-redux";

export const GetPropSubCategories = createAsyncThunk("GetPropSubCategories/fetchData", async (categoryId) => {
    app.ChangeLinesSpinnerStatus(true);
    const response = await http.Get("/prop/cats/" + categoryId + "/subcats/");
    app.ChangeLinesSpinnerStatus(false);
    return response;
});
