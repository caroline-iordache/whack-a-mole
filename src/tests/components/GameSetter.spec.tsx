import {describe, it, expect, beforeEach, vi, afterEach} from 'vitest';
import {render, fireEvent, screen, cleanup, waitFor} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import gameReducer, {gameActions} from '../../stores/game.ts';
import usersReducer from '../../stores/users.ts';
import userReducer from '../../stores/user.ts';
import timerReducer from '../../stores/timer.ts';
import {usersMock} from "../../mocks/usersMock.ts";
import {GameSetter} from "../../components/GameSetter.tsx";
import {timerActions} from "../../stores/timer.ts";
import type {RootState} from "../../stores";
import {userMock} from "../../mocks/userMock.ts";

vi.stubGlobal('fetch', vi.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({id: 'test', username: 'test', score: 0}),
    })
));

describe('GameSetter', () => {
    let store: ReturnType<typeof configureStore>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                game: gameReducer,
                user: userReducer,
                users: usersReducer,
                timer: timerReducer,
            },
            preloadedState: {
                game: {status: 'idle', scoreUpdate: 5},
                user: userMock,
                users: {
                    users: usersMock,
                    errors: '',
                    limit: 10
                },
                timer: 1,
            }
        });
    });

    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    it('should update the game state to playing', () => {
        render(
            <Provider store={store}>
                <GameSetter/>
            </Provider>
        );

        const input = screen.getByTestId(/game-introduction__form-input/i);
        fireEvent.change(input, {target: {value: 'Caro'}});

        const button = screen.getByRole('button', {name: /play/i});
        fireEvent.click(button);

        expect((store.getState() as RootState).game.status).toBe('playing');
    });

    it('should update the score of users', async () => {
        render(
            <Provider store={store}>
                <GameSetter/>
            </Provider>
        );

        store.dispatch(timerActions.updateTimer())

        await waitFor(() => {
            expect((store.getState() as RootState).users.users).toEqual([...usersMock, userMock]);
        });
    });

    it('should update the game state to end', async () => {
        render(
            <Provider store={store}>
                <GameSetter/>
            </Provider>
        );

        store.dispatch(timerActions.updateTimer())

        await waitFor(() => {
            expect((store.getState() as RootState).game.status).toBe('end');
        }, {timeout: 2100});
    });

    it('should show times up text', async () => {
        render(
            <Provider store={store}>
                <GameSetter/>
            </Provider>
        );

        store.dispatch(timerActions.updateTimer())

        await waitFor(() => {
            const timesUpText = screen.getByText(/Time's up/i);
            expect(timesUpText).toBeTruthy()
        }, {timeout: 500});
    });

    it('should have gameIntroduction component', async () => {
        render(
            <Provider store={store}>
                <GameSetter/>
            </Provider>
        );
        const gameIntroduction = screen.queryByTestId(/game-introduction-component/i);
        expect(gameIntroduction).toBeTruthy()
        const gameboard = screen.queryByTestId(/gameboard-component/i);
        expect(gameboard).toBeFalsy()
        const leaderboard = screen.queryByTestId(/leaderboard-component/i);
        expect(leaderboard).toBeFalsy()
    });

    it('should have gameboard component', async () => {
        render(
            <Provider store={store}>
                <GameSetter/>
            </Provider>
        );

        store.dispatch(gameActions.updateGameStatus('playing'))

        await waitFor(() => {
            const gameIntroduction = screen.queryByTestId(/game-introduction-component/i);
            expect(gameIntroduction).toBeFalsy()
            const gameboard = screen.queryByTestId(/gameboard-component/i);
            expect(gameboard).toBeTruthy()
            const leaderboard = screen.queryByTestId(/leaderboard-component/i);
            expect(leaderboard).toBeFalsy()
        });
    });

    it('should have leaderboard component', async () => {
        render(
            <Provider store={store}>
                <GameSetter/>
            </Provider>
        );

        store.dispatch(gameActions.updateGameStatus('end'))

        await waitFor(() => {
            const gameIntroduction = screen.queryByTestId(/game-introduction-component/i);
            expect(gameIntroduction).toBeFalsy()
            const gameboard = screen.queryByTestId(/gameboard-component/i);
            expect(gameboard).toBeFalsy()
            const leaderboard = screen.queryByTestId(/leaderboard-component/i);
            expect(leaderboard).toBeTruthy()
        });
    });

    it('should display error if patch fails', async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.reject()
        ));

        render(
            <Provider store={store}>
                <GameSetter/>
            </Provider>
        );

        store.dispatch(timerActions.updateTimer())

        await waitFor(() => {
            const error = screen.queryByTestId(/data-patch-error/i);
            expect(error).toBeTruthy()
        }, {timeout: 500});
    });
});
