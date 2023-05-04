import { createSlice } from '@reduxjs/toolkit';
import { alertTopMessageModel } from './model';

const initialState =
{
    data: { ...alertTopMessageModel }
}

const reducers = {
    setTopMessageState(state, action) {
        state.data = action.payload
    }
}


export const AlertTopMessageSlice = createSlice({
    name: 'TopMessage',
    initialState,
    reducers: { ...reducers },

})

export const { setTopMessageState } = AlertTopMessageSlice.actions

export default AlertTopMessageSlice.reducer;