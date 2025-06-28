import {createSlice} from "@reduxjs/toolkit";
import type {GameStatus} from "../types/GameStatus.ts";

const timerSlice = createSlice({
    name: 'timer',
    initialState: 120,
    reducers: {
        updateTimer: (state: number) => {
            if (state > 0) {
                return state - 1
            }
            return 0;
        }
    }
})

export const timerActions = timerSlice.actions;
export default timerSlice.reducer;