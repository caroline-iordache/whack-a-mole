import {describe, it, expect, beforeEach, vi, afterEach} from 'vitest';
import {render, screen, cleanup, fireEvent} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import gameReducer from '../../stores/game.ts';
import {Mole} from "../../components/Mole.tsx";
import {moleMockHidden, moleMockNotTouched, moleMockTouched} from "../../mocks/moleMock.ts";
import type {RootState} from "../../stores";

describe('Mole', () => {
    let store: ReturnType<typeof configureStore>;
    const onMoleClick = vi.fn();

    beforeEach(() => {
        store = configureStore({
            reducer: {
                game: gameReducer,
            },
            preloadedState: {
                game: {status: 'playing', scoreUpdate: 5},
            }
        });
    });

    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    it('should show the hole', () => {
        render(
            <Provider store={store}>
                <Mole mole={moleMockHidden} onMoleClick={onMoleClick}></Mole>
            </Provider>
        );

        const hole = screen.getByAltText(/Hole/i);
        expect(hole).toBeTruthy()
    });

    it('should call onMoleClick when touching mole', () => {
        render(
            <Provider store={store}>
                <Mole mole={moleMockNotTouched} onMoleClick={onMoleClick}></Mole>
            </Provider>
        );

        const moleNotTouched = screen.getByAltText(/Mole not touched/i);
        expect(moleNotTouched).toBeTruthy()

        fireEvent.click(moleNotTouched);
        expect(onMoleClick).toHaveBeenCalledTimes(1)
    });

    it('should show the mole touched', () => {
        render(
            <Provider store={store}>
                <Mole mole={moleMockTouched} onMoleClick={onMoleClick}></Mole>
            </Provider>
        );

        const moleTouched = screen.getByAltText(/Mole touched/i);
        expect(moleTouched).toBeTruthy()
    });

    it('should show score up', async () => {
        render(
            <Provider store={store}>
                <Mole mole={moleMockTouched} onMoleClick={onMoleClick}></Mole>
            </Provider>
        );

        const scoreText = screen.getByText((store.getState() as RootState).game.scoreUpdate);
        expect(scoreText).toBeTruthy()
    });
});
