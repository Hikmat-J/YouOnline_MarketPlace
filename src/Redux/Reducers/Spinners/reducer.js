import {combineReducers} from "@reduxjs/toolkit";
import LinesReducer from "./Lines/slice";

const SpinnerReducer = combineReducers({
    Lines: LinesReducer,
});

export default SpinnerReducer;
