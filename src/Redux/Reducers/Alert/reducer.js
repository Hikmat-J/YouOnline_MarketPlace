import { combineReducers } from '@reduxjs/toolkit';
import TopMessage from './TopMessage/slice';

const AlertReducer = combineReducers({
    TopMessage,
})

export default AlertReducer;