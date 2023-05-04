import {combineReducers} from "redux";
import BrandsReducer from "./Brands/reducer";
import FeaturedAutomotiveReducer from "./Featured/slice";
import AutomotiveCategoriesReducer from "./Categories/slice";

const AutomotiveReducer = combineReducers({
    Brands: BrandsReducer,
    Featrued: FeaturedAutomotiveReducer,
    Categories: AutomotiveCategoriesReducer,
});

export default AutomotiveReducer;
