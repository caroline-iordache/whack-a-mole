import {Gameboard} from "../pages/Gameboard.tsx";
import {GameIntroduction} from "../pages/GameIntroduction.tsx";
import {Leaderboard} from "../pages/Leaderboard.tsx";
import {useEffect, useState} from "react";
import type {GameStatus} from "../types/GameStatus.ts";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useHammerCursor} from "../hooks/useHammerCursor.tsx";
import {gameActions} from "../stores/game.ts";


export function GameSetter() {
    const dispatch = useDispatch()
    const [error, setError] = useState<string | null>(null);
    const game = useSelector((state) => state.game);
    const user = useSelector((state) => state.user);
    const timer = useSelector((state) => state.timer);
    useHammerCursor()

    function updateGameState(gameState: GameStatus) {
        dispatch(gameActions.updateGameStatus(gameState));
    }

    useEffect(() => {
        async function endGame() {
            try {
                const url = `https://whakeamole-default-rtdb.europe-west1.firebasedatabase.app/users/${user.id}.json`
                const response = await fetch(url, {
                    method: "PATCH",
                    body: JSON.stringify({
                        username: user.username,
                        score: user.score
                    }),
                    headers: {'Content-Type': 'application/json'},
                })

                if (!response.ok) {
                    setError(response.statusText);
                } else {
                    setTimeout(() => {
                        dispatch(gameActions.updateGameStatus('end'));
                    }, 5000)
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (timer === 0) {
            endGame().then();
        }
    }, [dispatch, timer, user]);

    return (
        <StyledGameContainer>
            <div className="game_container">
                {game.status === 'idle' && <GameIntroduction updateGameState={updateGameState}></GameIntroduction>}
                {game.status === 'playing' && <Gameboard></Gameboard>}
                {game.status === 'end' && <Leaderboard></Leaderboard>}
            </div>
        </StyledGameContainer>
    )
}


const StyledGameContainer = styled.section`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .game_container {
        display: flex;
        justify-content: center;
        flex-direction: column;
        max-width: 1500px;
        align-items: center;
    }
`
