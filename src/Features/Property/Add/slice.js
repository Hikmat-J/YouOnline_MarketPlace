// import {createSlice} from "@reduxjs/toolkit";
// import * as ResponseModel from "./models/response";
// import {AddProperty} from "./middleware";
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
//     .addCase(AddProperty.pending, (state, action) => {
//         state.status = "loading";
//     })
//     .addCase(AddProperty.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.data = action.payload;
//     })
//     .addCase(AddProperty.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//     });
// }

// const AddPropertySlice = createSlice({
//     name: "AddProperty",
//     initialState,
//     reducers: {...reducers},
//     extraReducers,
// });

// const selectAddProperty = (state) => {
//     return state.Property.Add;
// };

// export default AddPropertySlice.reducer;

// export {selectAddProperty, AddPropertySlice};
