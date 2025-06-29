import {describe, it, expect} from 'vitest';
import gameReducer, {gameActions} from "../../stores/game";
import type { GameStatus } from '../../types/GameStatus';

describe("GameStore", () => {
    it('should return the initial state', () => {
        expect(gameReducer(undefined, {type: 'unknown'})).toEqual({
            status: 'idle',
            scoreUpdate: 100
        });
    });

    it('should update the game to playing', () => {
        const previousState = {
            status: 'idle',
            scoreUpdate: 100
        };

        const newState = gameReducer(previousState, gameActions.updateGameStatus('playing' as GameStatus));
        expect(newState.status).toBe('playing');
        expect(newState.scoreUpdate).toBe(100);
    });
});