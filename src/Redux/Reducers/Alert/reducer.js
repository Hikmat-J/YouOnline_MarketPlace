import {combineReducers} from "@reduxjs/toolkit";
import TopMessage from "./TopMessage/slice";
import Toast from "./Toast/slice";

const AlertReducer = combineReducers({
    TopMessage,
    Toast,
});

export default AlertReducer;
