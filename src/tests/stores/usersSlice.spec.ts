import {describe, it, expect} from 'vitest';
import usersReducer, {usersActions} from "../../stores/users.ts";
import type {UserType} from "../../types/User.ts";
import {usersMock} from "../../mocks/usersMock.ts";
import {userMock} from "../../mocks/userMock.ts";

describe("UsersStore", () => {
    it('should return the initial state', () => {
        expect(usersReducer(undefined, {type: 'unknown'})).toEqual({
            users: [] as UserType[],
            errors: '',
            limit: 10
        });
    });

    it('should set users', () => {
        const newState = usersReducer({
            users: [] as UserType[],
            errors: '',
            limit: 10
        }, usersActions.setUsers(usersMock));

        expect(newState.users).toEqual(usersMock);
        expect(newState.limit).toBe(10);
        expect(newState.errors).toBe('');
    });

    it('should update users', () => {
        const newState = usersReducer({
            users: usersMock,
            errors: 'Error',
            limit: 10
        }, usersActions.updateUsers(userMock));

        expect(newState.users).toEqual([...usersMock, userMock]);
        expect(newState.limit).toBe(10);
        expect(newState.errors).toBe('');
    });

    it('should set errors', () => {
        const newState = usersReducer({
            users: usersMock,
            errors: '',
            limit: 10
        }, usersActions.setErrors('error'));

        expect(newState.users).toEqual([]);
        expect(newState.limit).toBe(10);
        expect(newState.errors).toBe('error');
    });
});