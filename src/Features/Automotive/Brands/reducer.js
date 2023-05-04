import { combineReducers } from "redux";
import FeaturedReducer from './Featured/slice'

const BrandsReducer = combineReducers({
    Featured: FeaturedReducer
});

export default BrandsReducer;