import type {UserType} from "../types/User";
import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: crypto.randomUUID(),
        username: '',
        score: 0
    },
    reducers: {
        setUsername: (state, action: { payload: string }) => {
            state.username = action.payload
        },
        updateUserScore: (state, action: { payload: number }) => {
            state.score += action.payload
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;