import {createSlice} from "@reduxjs/toolkit";
import {toastAlertModel} from "./model";

const initialState = {
    data: {...toastAlertModel},
};

const reducers = {
    setToastAlertState(state, action) {
        state.data = action.payload;
    },
};

export const ToastAlertSlice = createSlice({
    name: "ToastAlert",
    initialState,
    reducers: {...reducers},
});

export const {setToastAlertState} = ToastAlertSlice.actions;

export default ToastAlertSlice.reducer;
