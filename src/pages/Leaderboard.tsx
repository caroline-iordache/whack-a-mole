import {useEffect, useState} from "react";
import type {UserType} from "../types/User.ts";
import styled from "styled-components";
import {Button} from "../components/Button.tsx";
import {gameActions} from "../stores/game.ts";
import {useDispatch} from "react-redux";
import {userActions} from "../stores/user.ts";


export function Leaderboard() {
    const SCORE_DISPLAY_LIMIT = 10;
    const dispatch = useDispatch()
    const [users, setUsers] = useState<UserType[]>([]);
    const [error, setError] = useState<string>();

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
                const usersFetched: Record<string, UserType> = await response?.json();
                const userMapped: UserType[] = Object.entries(usersFetched).map(([,user]: [string, UserType]) => ({
                    ...user,
                }));
                const userSorted = userMapped.sort((a: UserType, b: UserType) => a.score - b.score).reverse().slice(0, SCORE_DISPLAY_LIMIT);
                setUsers(userSorted);

            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Unknown error');
                }
            }
        }

        getGameData().then()
    }, []);

    function retry() {
        dispatch(gameActions.updateGameStatus('idle'));
        dispatch(userActions.resetStatus());
    }

    return (
        <StyledLeaderboard className="leaderboard">
            {error && <p>An error has occurred, we cannot get the users highest scores </p>}
            {!error &&
                <>
                    <h1>{SCORE_DISPLAY_LIMIT} Highest scores</h1>
                    <ol className='leaderboard__list'>
                        {users.map((user: UserType) => (
                            <li className='leaderboard__items' key={user.id}>
                                <span>{user.username}</span>
                                <span>{user.score}</span>
                            </li>
                        ))}
                    </ol>
                </>
            }
            <Button onClick={retry}>Retry</Button>
        </StyledLeaderboard>
    )
}


const StyledLeaderboard = styled.section`
    display: flex;
    text-align: center;
    align-self: center;
    flex-direction: column;
    font-family: 'Comic Relief', sans-serif;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.8);
    padding: 20px 40px;
    width: 100%;

    .leaderboard__list {
        padding-left: 0;
    }

    .leaderboard__items {
        padding-left: 0;
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
    }
`
