import {FeaturedPropertySlice, selectFeaturedProperty} from "./slice";
import FeaturedPropertiesReducer from "./slice";
import * as RequestModel from "./models/request";
import * as ResponseModel from "./models/response";
import {GetFeaturedProperties} from "./middleware";

export {
    RequestModel,
    ResponseModel,
    FeaturedPropertiesReducer,
    FeaturedPropertySlice,
    GetFeaturedProperties,
    selectFeaturedProperty,
};
