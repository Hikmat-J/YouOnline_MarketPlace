import {combineReducers, configureStore} from "@reduxjs/toolkit";
import CommonReducer from "../../Features/Common/reducer";
import AuthReducer from "../../Features/Auth/slice";
import ProfileReducer from "../../Features/Profile/Details/slice";
import SpinnerReducer from "../Reducers/Spinners/reducer";
import AlertReducer from "../Reducers/Alert/reducer";
import AutomotiveReducer from "../../Features/Automotive/reducer";
import PropertyReducer from "../../Features/Property/reducer";

const reducers = combineReducers({
    Common: CommonReducer,
    Auth: AuthReducer,
    Spinners: SpinnerReducer,
    Alerts: AlertReducer,
    Profile: ProfileReducer,
    Automotive: AutomotiveReducer,
    Property: PropertyReducer,
});

export default configureStore({
    reducer: reducers,
});
