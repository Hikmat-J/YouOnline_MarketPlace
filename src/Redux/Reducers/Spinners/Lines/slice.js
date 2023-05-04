import { createSlice } from '@reduxjs/toolkit';

const initialState =
{
    show: false
}

const reducers = {
    setLinesSpinnerStatus(state, action) {
        state.show = action.payload
    }
}


export const SpinnerLinesSlice = createSlice({
    name: 'Lines',
    initialState,
    reducers: { ...reducers },

})

export const { setLinesSpinnerStatus } = SpinnerLinesSlice.actions

export default SpinnerLinesSlice.reducer;