import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest';
import {cleanup, render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import timerReducer from '../../stores/timer.ts';
import {Timer} from "../../components/Timer.tsx";
import {act} from "react";

vi.useFakeTimers();

describe('Timer', () => {
    let store: ReturnType<typeof configureStore>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                timer: timerReducer,
            },
            preloadedState: {
                timer: 60,
            }
        });
    });

    afterEach(() => {
        cleanup();
    });


    it('should display timer at the initial state', async () => {
        render(<Provider store={store}><Timer></Timer></Provider>);
        const timer = screen.getByTestId(/timer/i);
        expect(timer).toBeTruthy()
        expect(timer.textContent).toEqual("1 : 00")
    });

    it('should decrement timer', async () => {
        render(<Provider store={store}><Timer></Timer></Provider>);
        const timer = screen.getByTestId(/timer/i);

        act(() => {
            vi.advanceTimersByTime(1000);
        });

        expect(timer.textContent).toEqual("0 : 59")
    });
});
