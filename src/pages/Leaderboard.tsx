import type {UserType} from "../types/User.ts";
import styled from "styled-components";
import {Button} from "../components/Button.tsx";
import {gameActions} from "../stores/game.ts";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../stores/user.ts";
import type {RootState} from "../stores";
import {timerActions} from "../stores/timer.ts";


export function Leaderboard() {
    const dispatch = useDispatch();
    const users = useSelector((state:RootState) => state.users);

    function retry() {
        dispatch(gameActions.updateGameStatus('idle'));
        dispatch(userActions.resetStatus());
        dispatch(timerActions.resetTimer());
    }

    return (
        <StyledLeaderboard className="leaderboard">
            {users.errors && <p>An error has occurred, we cannot get the users highest scores </p>}
            {!users.errors &&
                <>
                    <h1>{users.limit && users.limit }Highest scores</h1>
                    <ol className='leaderboard__list'>
                        {users.users.map((user: UserType) => (
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
