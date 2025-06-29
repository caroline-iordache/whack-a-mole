import {describe, it, expect, beforeEach, vi, afterEach} from 'vitest';
import {render, fireEvent, screen, cleanup} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import gameReducer from '../../stores/game.ts';
import userReducer from '../../stores/user.ts';
import {GameIntroduction} from "../../pages/GameIntroduction.tsx";
import type {RootState} from "../../stores";
import {userMock} from "../../mocks/userMock.ts";

describe('GameIntroduction', () => {
    let store: ReturnType<typeof configureStore>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                game: gameReducer,
                user: userReducer,
            },
            preloadedState: {
                game: {status: 'idle', scoreUpdate: 5},
                user: userMock,
            }
        });
    });

    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    it('should not call startGame if the input is empty', () => {
        const startGame = vi.fn();

        render(
            <Provider store={store}>
                <GameIntroduction updateGameState={startGame}/>
            </Provider>
        );

        const button = screen.getByRole('button', {name: /play/i});
        fireEvent.click(button);

        expect(startGame).not.toHaveBeenCalled()
    });

    it('should call startGame when form is submitted with name', () => {
        const startGame = vi.fn();

        render(
            <Provider store={store}>
                <GameIntroduction updateGameState={startGame}/>
            </Provider>
        );

        const input = screen.getByTestId(/game-introduction__form-input/i);
        fireEvent.change(input, {target: {value: 'Caro'}});

        const button = screen.getByRole('button', {name: /play/i});
        fireEvent.click(button);

        expect(startGame).toHaveBeenCalledTimes(1);

        expect((store.getState() as RootState).user.username).toBe('Caro');
    });
});
