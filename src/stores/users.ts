import {createSlice} from "@reduxjs/toolkit";
import type {UserType} from "../types/User.ts";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [] as UserType[],
        errors: '',
        limit: 10
    },
    reducers: {
        setUsers: (state, action: { payload: UserType[] }) => {
            state.users = action.payload;
            state.errors = '';
        },
        updateUsers: (state, action: { payload: UserType }) => {
            state.users = [...state.users, action.payload];
            state.errors = '';
        },
        setErrors: (state, action: { payload: string }) => {
            state.errors = action.payload;
        }
    }
})

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;