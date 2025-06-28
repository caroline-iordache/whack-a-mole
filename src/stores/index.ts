import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./user";
import usersReducer from "./users";
import gameReducer from "./game";
import timerReducer from "./timer";

export const store = configureStore({
    reducer: {user: userReducer, game: gameReducer, timer: timerReducer, users: usersReducer}
})

export type RootState = ReturnType<typeof store.getState>

export default store;