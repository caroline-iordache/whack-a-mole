import {describe, it, expect, beforeEach, vi, afterEach} from 'vitest';
import {render, fireEvent, screen, cleanup} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import gameReducer from '../../stores/game.ts';
import userReducer from '../../stores/user.ts';
import usersReducer from '../../stores/users.ts';
import timerReducer from '../../stores/timer.ts';
import {Gameboard} from "../../pages/Gameboard.tsx";
import {usersMock} from "../../mocks/usersMock.ts";
import {act} from "react";
import type {RootState} from "../../stores";
import {userMock} from "../../mocks/userMock.ts";

vi.useFakeTimers();

describe('GameBoard', () => {
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
                game: {status: 'playing', scoreUpdate: 5},
                timer: 3,
                user: userMock,
                users: {
                    users: usersMock,
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

    it('should init an array of moles', () => {
        render(
            <Provider store={store}>
                <Gameboard/>
            </Provider>
        );

        const moles = screen.getAllByTestId(/data-moles-list/i);
        expect(moles).toHaveLength(12)
    });

    it('should update score when mole is clicked', () => {
        render(
            <Provider store={store}>
                <Gameboard/>
            </Provider>
        );

        act(() => {
            vi.advanceTimersByTime(1000);
        });

        const moleNotTouched = screen.getByAltText(/Mole not touched/i);
        fireEvent.click(moleNotTouched);

        expect((store.getState() as RootState).user.score).toEqual(5);
    });

    it('should NOT update score when the same mole is clicked twice', () => {
        render(
            <Provider store={store}>
                <Gameboard/>
            </Provider>
        );

        act(() => {
            vi.advanceTimersByTime(1000);
        });

        const moleNotTouched = screen.getByAltText(/Mole not touched/i);
        fireEvent.click(moleNotTouched);
        expect((store.getState() as RootState).user.score).toEqual(5);

        fireEvent.click(moleNotTouched);
        expect((store.getState() as RootState).user.score).toEqual(5);
    });

    it('should NOT update score when the hole is clicked', () => {
        render(
            <Provider store={store}>
                <Gameboard/>
            </Provider>
        );

        const hole = screen.getAllByAltText(/Hole/i);
        fireEvent.click(hole[0]);

        expect((store.getState() as RootState).user.score).toEqual(0);
    });

    it('should display mole longer when clicked', () => {
        render(
            <Provider store={store}>
                <Gameboard/>
            </Provider>
        );

        act(() => {
            vi.advanceTimersByTime(1000);
        });

        const moleNotTouched = screen.getByAltText(/Mole not touched/i);
        fireEvent.click(moleNotTouched);

        act(() => {
            vi.advanceTimersByTime(2000);
        });

        expect(moleNotTouched).toBeTruthy()
    });
});
