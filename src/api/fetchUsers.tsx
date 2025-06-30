import type {UserType} from "../types/User.ts";

export async function fetchUsers(): Promise<UserType[]> {
    try {
        const response = await fetch("https://whakeamole-default-rtdb.europe-west1.firebasedatabase.app/users.json", {
            headers: {'Content-Type': 'application/json'},
        });

        const usersFetched: Record<string, UserType> = await response?.json();
        return Object.entries(usersFetched).map(([id, user]: [string, UserType]) => ({
            ...user,
            id,
        }));
    } catch (error: unknown) {
        throw (error instanceof Error ? error.message : "Unknown error");
    }

}