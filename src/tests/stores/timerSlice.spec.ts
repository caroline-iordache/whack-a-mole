import {describe, it, expect} from 'vitest';
import timerReducer, {timerActions} from "../../stores/timer.ts";

describe("TimerStore", () => {
    it('should return the initial state', () => {
        expect(timerReducer(undefined, {type: 'unknown'})).toEqual(120);
    });

    it('should update the timer', () => {
        const newState = timerReducer(120, timerActions.updateTimer());
        expect(newState).toBe(119);
    });

    it('should not update the timer because already to 0', () => {
        const newState = timerReducer(0, timerActions.updateTimer());
        expect(newState).toBe(0);
    });

    it('should reset the timer', () => {
        const newState = timerReducer(120, timerActions.resetTimer());
        expect(newState).toBe(120);
    });
});