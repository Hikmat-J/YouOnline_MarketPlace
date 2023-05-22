import {combineReducers} from "redux";
import FeaturedPropertiesReducer from "./Featured/slice";
import PropertyCategoriesReducer from "./Categories/slice";
import GetPropertyByCategoryReducer from "./GetByCategory/slice";
import AddPropertyReducer from "./Add/slice";
import {FilterPropertiesReducer} from "./Filter";
import PropSubCategoriesReducer from "./SubCategories/slice";

const PropertyReducer = combineReducers({
    Featured: FeaturedPropertiesReducer,
    Categories: PropertyCategoriesReducer,
    ByCategoryId: GetPropertyByCategoryReducer,
    AddProperty: AddPropertyReducer,
    Filter: FilterPropertiesReducer,
    SubCategories: PropSubCategoriesReducer,
});

export default PropertyReducer;
