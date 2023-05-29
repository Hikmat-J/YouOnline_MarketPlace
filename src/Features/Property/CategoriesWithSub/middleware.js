import * as http from "../../../Services/http";
import * as app from "../../../Services/app";
import * as ApiQuery from "../../../Services/APIProcessing";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {SetData, SetError, SetLoading, selectPropertyCategories} from "./slice";
import {useDispatch, useSelector} from "react-redux";

export const GetPropertyCategoriesWithSub = createAsyncThunk("GetPropertyCategoriesWithSub/fetchData", async () => {
    const response = await http.Get("/prop/catsubcats/");
    return response;
});

export const GetPropertyCategoriesApi = () => {
    // const dispatch = useDispatch();
    // const selector = useSelector((state) => selectPropertyCategories(state));
    // const {data, error, status, refetch} = ApiQuery.GetQuery(["/prop/webcats/"], "/prop/webcats/");
    // const response = {data, status, error};
    // if (response.status === "loading" && selector.status !== "loading") dispatch(SetLoading(response));
    // if (response.status === "error" && selector.status !== "error") dispatch(SetError(response));
    // if (response.status === "success" && selector.status !== "succeeded") dispatch(SetData(response));
    // return {data, error, status, refetch};

};
