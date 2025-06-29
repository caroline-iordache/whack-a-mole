import type {UserType} from "../types/User.ts";
import styled from "styled-components";
import {Button} from "../components/Button.tsx";
import {gameActions} from "../stores/game.ts";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../stores/user.ts";
import type {RootState} from "../stores";
import {timerActions} from "../stores/timer.ts";
import {useEffect} from "react";
import {fetchUsers} from "../api/fetchUsers.tsx";
import {usersActions} from "../stores/users.ts";

export function Leaderboard() {
    const dispatch = useDispatch();
    const users = useSelector((state:RootState) => state.users);

    function retry() {
        dispatch(gameActions.updateGameStatus('idle'));
        dispatch(userActions.resetStatus());
        dispatch(timerActions.resetTimer());
    }

    useEffect(() => {
        fetchUsers().then((users: UserType[]) => {
            dispatch(usersActions.setUsers(users));
        }).catch((error: string) => {
            dispatch(usersActions.setErrors(error));
        });
    }, [dispatch]);

    return (
        <StyledLeaderboard data-testid="leaderboard-component" className="leaderboard">
            {users.errors && <p data-testid="data-leaderboard__error">An error has occurred, we cannot get the users highest scores </p>}
            {!users.errors &&
                <>
                    <h1>{users.limit && <span>{users.limit} </span>}Highest scores</h1>
                    <ol data-testid="data-leaderboard__list" className='leaderboard__list'>
                        {users.users.map((user: UserType) => (
                            <li className='leaderboard__items' key={user.id}>
                                <span>{user.username}</span>
                                <span>{user.score}</span>
                            </li>
                        ))}
                    </ol>
                </>
            }
            <Button data-testid="data-leaderboard__button" onClick={retry}>Play again</Button>
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
