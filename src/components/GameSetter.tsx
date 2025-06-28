import {Gameboard} from "../pages/Gameboard.tsx";
import {GameIntroduction} from "../pages/GameIntroduction.tsx";
import {Leaderboard} from "../pages/Leaderboard.tsx";
import {useState} from "react";
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
    useHammerCursor()

    function updateGameState(gameState: GameStatus) {
        dispatch(gameActions.updateGameStatus(gameState));
    }

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
                dispatch(gameActions.updateGameStatus('end'));
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <StyledGameContainer>
            <div className="game_container">
                {game.status === 'idle' && <GameIntroduction updateGameState={updateGameState}></GameIntroduction>}
                {game.status === 'playing' && <Gameboard updateGameState={endGame}></Gameboard>}
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
