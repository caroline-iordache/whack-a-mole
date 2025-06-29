import {describe, it, expect, beforeEach, vi, afterEach} from 'vitest';
import {render, fireEvent, screen, cleanup, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import gameReducer from '../../stores/game.ts';
import userReducer from '../../stores/user.ts';
import usersReducer from '../../stores/users.ts';
import timerReducer from '../../stores/timer.ts';
import {usersMock} from "../../mocks/usersMock.ts";
import {Leaderboard} from "../../pages/Leaderboard.tsx";
import type {RootState} from "../../stores";
import {userMock} from "../../mocks/userMock.ts";

describe('LeaderBoard', () => {
    let store: ReturnType<typeof configureStore>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                game: gameReducer,
                timer: timerReducer,
                user: userReducer,
                users: usersReducer,
            },
            preloadedState: {
                game: {status: 'end', scoreUpdate: 5},
                timer: 1,
                user: userMock,
                users: {
                    users: [],
                    errors: '',
                    limit: 10
                },
            }
        });
    });

    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    it('should fetch and display users score', async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(usersMock),
            })
        ));


        render(
            <Provider store={store}>
                <Leaderboard/>
            </Provider>
        );

        await waitFor(() => {
            const userList = screen.getByTestId(/data-leaderboard__list/i);
            usersMock.forEach((user) => {
                expect(userList.textContent).toContain(user.username)
                expect(userList.textContent).toContain(user.score)
            })
        });
    });

    it('should NOT fetch and display error', async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.reject(new Error('something happened'))
        ));

        render(
            <Provider store={store}>
                <Leaderboard/>
            </Provider>
        );

        await waitFor(() => {
            const error = screen.getByTestId(/data-leaderboard__error/i);
            expect(error).toBeTruthy()
        });
    });

    it('should update game status on retry click', async () => {
        render(
            <Provider store={store}>
                <Leaderboard/>
            </Provider>
        );
        await waitFor(() => {
            const button = screen.getByText(/Play again/i);
            fireEvent.click(button);
            expect((store.getState() as RootState).game.status).toBe('idle');
        });
    });

    it('should update user status on retry click', async () => {
        render(
            <Provider store={store}>
                <Leaderboard/>
            </Provider>
        );
        await waitFor(() => {
            const button = screen.getByText(/Play again/i);
            fireEvent.click(button);
            expect((store.getState() as RootState).user.username).toBe('');
            expect((store.getState() as RootState).user.score).toBe(0);
        });
    });
});
