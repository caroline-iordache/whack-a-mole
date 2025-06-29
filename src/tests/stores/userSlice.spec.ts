import {describe, it, expect} from 'vitest';
import userReducer, {userActions} from "../../stores/user.ts";
import {userMock} from "../../mocks/userMock.ts";

describe("UserStore", () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, {type: 'unknown'})).toEqual({
            id: expect.any(String),
            username: '',
            score: 0
        });
    });

    it('should reset status', () => {
        const newState = userReducer(userMock, userActions.resetStatus());
        expect(newState.id).not.toEqual(userMock.id);
        expect(newState.username).toBe('');
        expect(newState.score).toBe(0);
    });

    it('should set username', () => {
        const newState = userReducer(userMock, userActions.setUsername('Johnny'));
        expect(newState.username).toBe('Johnny');
        expect(newState.score).toBe(0);
    });

    it('should update score', () => {
        const newState = userReducer(userMock, userActions.updateUserScore(10));
        expect(newState.username).toBe('Caro');
        expect(newState.score).toBe(10);
    });
});