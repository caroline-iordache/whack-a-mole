import {Gameboard} from "../pages/Gameboard.tsx";
import {GameIntroduction} from "../pages/GameIntroduction.tsx";
import {Leaderboard} from "../pages/Leaderboard.tsx";
import {useEffect, useRef, useState} from "react";
import type {GameStatus} from "../types/GameStatus.ts";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useHammerCursor} from "../hooks/useHammerCursor.tsx";
import {gameActions} from "../stores/game.ts";
import {CSSTransition} from 'react-transition-group';

export function GameSetter() {
    const dispatch = useDispatch()
    const [error, setError] = useState<string | null>(null);
    const game = useSelector((state) => state.game);
    const user = useSelector((state) => state.user);
    const timer = useSelector((state) => state.timer);
    const timesUpRef = useRef(null)
    const [showTimesUp, setShowTimesUp] = useState(false);
    const TIMES_UP_DELAY_MS = 2000;
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
                    setShowTimesUp(true);
                    setTimeout(() => {
                        setShowTimesUp(false);
                        dispatch(gameActions.updateGameStatus('end'));
                    }, TIMES_UP_DELAY_MS)
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Unknown error');
                }
            }
        }

        if (timer === 0) {
            endGame().then();
        }
    }, [dispatch, timer, user]);

    return (
        <StyledGameContainer delay={TIMES_UP_DELAY_MS}>
            {error && <p className="error">An error has occured. Sorry for the inconvenience : {error} </p>}
            {!error && <div className="game_container">
                {game.status === 'idle' && <GameIntroduction updateGameState={updateGameState}></GameIntroduction>}
                {game.status === 'playing' && <Gameboard></Gameboard>}
                {game.status === 'end' && <Leaderboard></Leaderboard>}

                <CSSTransition in={showTimesUp} unmountOnExit nodeRef={timesUpRef} timeout={0} classNames="timesUp">
                    <p ref={timesUpRef}>Times up</p>
                </CSSTransition>

            </div>}
        </StyledGameContainer>
    )
}

const StyledGameContainer = styled.section<{ delay: number }>`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .error {
        font-size: 20px;
        background-color: rgba(255, 255, 255, 0.8);
        padding: 20px;
        display: flex;
        align-items: center;
        align-self: center;
        justify-content: center;
    }

    .game_container {
        display: flex;
        justify-content: center;
        flex-direction: column;
        max-width: 1500px;
        align-items: center;
    }

    .timesUp-enter-done {
        position: fixed;
        font-size: 300px;
        color: white;
        font-family: "Comic Relief", system-ui;
        text-shadow: var(--black) 1px 0 10px;
        transition: font-size ${({delay}) => delay}ms;
    }
`
