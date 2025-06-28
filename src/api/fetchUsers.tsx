import type {UserType} from "../types/User.ts";

export async function fetchUsers(): Promise<UserType[]> {
    try {
        const response = await fetch("https://whakeamole-default-rtdb.europe-west1.firebasedatabase.app/users.json", {
            headers: {'Content-Type': 'application/json'},
        });

        if (!response.ok) {
            throw new Error(response.statusText)
        }
        const usersFetched: Record<string, UserType> = await response?.json();
        return Object.entries(usersFetched).map(([, user]: [string, UserType]) => ({
            ...user,
        }));
    } catch (error: unknown) {
        throw (error instanceof Error ? error.message : "Unknown error");
    }

}