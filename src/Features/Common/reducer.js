import { combineReducers } from "@reduxjs/toolkit";
import LangTranslationReducer from "./GetLangTranslation/slice";
import CountriesReducer from "./Countries/slice";
import StatesReducer from "./States/slice";
import CitiesReducer from "./Cities/slice";

const CommonReducer = combineReducers({
  LangKeys: LangTranslationReducer,
  Countries: CountriesReducer,
  States: StatesReducer,
  Cities: CitiesReducer,
});

export default CommonReducer;
