// import {createSlice} from "@reduxjs/toolkit";
// import * as ResponseModel from "./models/response";
// import {GetPropertyById} from "./middleware";
// import {CoreInitialState} from "../../../Models/CoreInitialState";

// const initialState = {
//     ...CoreInitialState,
//     data: ResponseModel.default,
// };

// const reducers = {
//     // Local Data Reducers
// };

// function extraReducers(builder) {
//     builder
//     .addCase(GetPropertyById.pending, (state, action) => {
//         state.status = "loading";
//     })
//     .addCase(GetPropertyById.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.data = action.payload;
//     })
//     .addCase(GetPropertyById.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//     });
// }

// const GetPropertyByIdSlice = createSlice({
//     name: "PropertyById",
//     initialState,
//     reducers: {...reducers},
//     extraReducers,
// });

// const selectGetPropertyById = (state) => {
//     return state.Property.Featured;
// };

// export default GetPropertyByIdSlice.reducer;

// export {selectGetPropertyById, GetPropertyByIdSlice};
