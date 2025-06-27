import {use, useEffect, useState} from "react";
import type {User} from "../types/User.ts";


export function Leaderboard() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getGameData() {
            try {
                const response = await fetch("https://whakeamole-default-rtdb.europe-west1.firebasedatabase.app/users.json", {
                    headers: {'Content-Type': 'application/json'},
                });

                if (!response.ok) {
                    setError(response.statusText);
                    return;
                }
                const usersFetched = await response?.json();
                const userMapped = Object.entries(usersFetched).map(([id, user]) => ({
                    id,
                    ...user,
                }));
                const userSorted = userMapped.sort((a: User, b: User) => a.score - b.score).reverse();
                setUsers(userSorted);

            } catch (error) {
                console.error(error);
            }
        }

        getGameData().then()
    }, []);

    return (
        <>
            <ul>
                {users.map((user: User) => (
                    <ol key={user.id}>
                        {user.username} : {user.score}
                    </ol>
                ))}
            </ul>
        </>
    )
}