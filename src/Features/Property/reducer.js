import {combineReducers} from "redux";
import FeaturedPropertiesReducer from "./Featured/slice";
import PropertyCategoriesReducer from "./Categories/slice";
import GetPropertyByCategoryReducer from "./GetByCategory/slice";
import AddPropertyReducer from "./Add/slice";

const PropertyReducer = combineReducers({
    Featured: FeaturedPropertiesReducer,
    Categories: PropertyCategoriesReducer,
    ByCategoryId: GetPropertyByCategoryReducer,
    AddProperty: AddPropertyReducer,
});

export default PropertyReducer;
