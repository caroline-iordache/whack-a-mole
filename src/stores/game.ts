import {createSlice} from "@reduxjs/toolkit";
import type {GameStatus} from "../types/GameStatus.ts";

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        status: 'idle'
    },
    reducers: {
        updateGameStatus: (state, action: { payload: GameStatus }) => {
            state.status = action.payload
        }
    }
})

export const gameActions = gameSlice.actions;
export default gameSlice.reducer;