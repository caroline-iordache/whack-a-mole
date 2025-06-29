import {describe, it, expect, vi} from "vitest";
import {usersMock} from "../../mocks/usersMock.ts";
import {patchUsers} from "../../api/patchUsers.tsx";

describe("patchUsers", () => {
      it('should return mock data', async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(usersMock[0]),
            })
        ));

        const users = await patchUsers(usersMock[0]).then();
        expect(users).toEqual(usersMock[0]);
    });

    it('should throw error', async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.reject(new Error('something happened'))
        ));

        await expect(patchUsers(usersMock[0])).rejects.toThrow('something happened')
    });

    it('should throw error with unknown error', async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.reject()
        ));
        await expect(patchUsers(usersMock[0])).rejects.toThrow( "Unknown error")
    });
})