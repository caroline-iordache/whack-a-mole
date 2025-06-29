import type {UserType} from "../types/User.ts";

export async function patchUsers(currentUser: UserType): Promise<UserType> {
    try {
        const url = `https://whakeamole-default-rtdb.europe-west1.firebasedatabase.app/users/${currentUser.id}.json`
        await fetch(url, {
            method: "PATCH",
            body: JSON.stringify({
                username: currentUser.username,
                score: currentUser.score
            }),
            headers: {'Content-Type': 'application/json'},
        })

        return currentUser;
    } catch (error: unknown) {
        throw (error instanceof Error ? error.message : "Unknown error");
    }
}