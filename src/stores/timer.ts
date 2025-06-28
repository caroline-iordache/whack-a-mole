import {createSlice} from "@reduxjs/toolkit";

const INITIAL_TIMER_VALUE = 120;

const timerSlice = createSlice({
    name: 'timer',
    initialState: INITIAL_TIMER_VALUE,
    reducers: {
        updateTimer: (state: number) => {
            if (state > 0) {
                return state - 1
            }
            return 0;
        },
        resetTimer: () => {
            return INITIAL_TIMER_VALUE;
        }
    }
})

export const timerActions = timerSlice.actions;
export default timerSlice.reducer;