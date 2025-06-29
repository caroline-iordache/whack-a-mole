import {Provider} from 'react-redux';
import {PlayerData} from "../../components/PlayerData.tsx";
import {describe, it, expect, beforeEach, vi, afterEach} from 'vitest';
import {render, screen, cleanup} from '@testing-library/react';
import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../../stores/user.ts';
import type {RootState} from "../../stores";
import {userMock} from "../../mocks/userMock.ts";

describe('PlayerData', () => {
    let store: ReturnType<typeof configureStore>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                user: userReducer,
            },
            preloadedState: {
                user: userMock,
            }
        });
    });

    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    it('should display children', async () => {
        render(<Provider store={store}><PlayerData>Test</PlayerData></Provider>);
        const children = screen.getByText(/Test/i);
        expect(children).toBeTruthy()
    });

    it('should display username', async () => {
        render(<Provider store={store}><PlayerData>Test</PlayerData></Provider>);
        const usernameText = screen.getByText((store.getState() as RootState).user.username);
        expect(usernameText).toBeTruthy()
    });

    it('should display score', async () => {
        render(<Provider store={store}><PlayerData>Test</PlayerData></Provider>);
        const scoreText = screen.getByText((store.getState() as RootState).user.score);
        expect(scoreText).toBeTruthy()
    });
});