import {createSlice} from "@reduxjs/toolkit";
import type {GameStatus} from "../types/GameStatus.ts";

const timerSlice = createSlice({
    name: 'timer',
    initialState: 5,
    reducers: {
        updateTimer: (state: number) => {
            if (state > 0) {
                return state - 1
            }
        }
    }
})

export const timerActions = timerSlice.actions;
export default timerSlice.reducer;