import {Gameboard} from "./Gameboard.tsx";
import {GameIntroduction} from "./GameIntroduction.tsx";
import {Leaderboard} from "./Leaderboard.tsx";
import {useEffect, useState} from "react";
import type {GameStatus} from "../types/GameStatus.ts";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../stores/user.ts";
import {useHammerCursor} from "../hooks/useHammerCursor.tsx";


export function GameSetter() {
    const dispatch = useDispatch()
    const [gameState, setGameState] = useState<GameStatus>('idle');
    const [error, setError] = useState<string | null>(null);
    const user = useSelector((state) => state.user);
    useHammerCursor()

    function updateGameState(gameState: GameStatus) {
        setGameState(gameState);
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
                setGameState('end');
            }
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <StyledGameContainer>
            <div className="game_container">
                {gameState === 'idle' && <GameIntroduction updateGameState={updateGameState}></GameIntroduction>}
                {gameState === 'playing' && <Gameboard updateGameState={endGame}></Gameboard>}
                {gameState === 'end' && <Leaderboard></Leaderboard>}
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
