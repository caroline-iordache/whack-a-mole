import {describe, it, expect, vi} from "vitest";
import {usersMock} from "../../mocks/usersMock.ts";
import {fetchUsers} from "../../api/fetchUsers.tsx";

describe("fetchUsers", () => {
    it('should return mock data', async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    "1": {
                        id:"1",
                        score: 1000,
                        username: "Charles",
                    },
                    "2": {
                        id:"2",
                        score: 500,
                        username: "Denis",
                    }
                }),
            })
        ));

        const users = await fetchUsers();
        expect(users).toEqual(usersMock);
    });

    it('should throw error with error message', async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.reject(new Error('something happened'))
        ));
        await expect(fetchUsers()).rejects.toThrow('something happened')
    });

    it('should throw error with unknown error', async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.reject()
        ));
        await expect(fetchUsers()).rejects.toThrow( "Unknown error")
    });
})