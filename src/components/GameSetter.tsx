import {Gameboard} from "../pages/Gameboard.tsx";
import {GameIntroduction} from "../pages/GameIntroduction.tsx";
import {Leaderboard} from "../pages/Leaderboard.tsx";
import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {useHammerCursor} from "../hooks/useHammerCursor.tsx";
import {gameActions} from "../stores/game.ts";
import {CSSTransition} from 'react-transition-group';
import type {RootState} from "../stores";
import {usersActions} from "../stores/users.ts";
import type {UserType} from "../types/User.ts";
import {patchUsers} from "../api/patchUsers.tsx";

export function GameSetter() {
    const dispatch = useDispatch()
    const [error, setError] = useState<string | null>(null);
    const game = useSelector((state: RootState) => state.game);
    const user = useSelector((state: RootState) => state.user);
    const timer = useSelector((state: RootState) => state.timer);
    const timesUpRef = useRef(null)
    const [showTimesUp, setShowTimesUp] = useState(false);
    const TIMES_UP_DELAY_MS = 2000;

    /**
     * Hook to show the hammer cursor
     */
    useHammerCursor()

    /**
     * Start the game by updating the state
     */
    function startGame() {
        dispatch(gameActions.updateGameStatus('playing'));
    }

    /**
     * When timer === 0
     * Show the text animation time's up
     * Update the score with the new one
     * End the game by updating the game status
     */
    useEffect(() => {
        async function endGame() {
            const currentUser: UserType = {
                id: user.id,
                username: user.username,
                score: user.score
            };

            patchUsers(currentUser).then(() => {
                setShowTimesUp(true);
                dispatch(usersActions.updateUsers(currentUser));
                setTimeout(() => {
                    setShowTimesUp(false);
                    dispatch(gameActions.updateGameStatus('end'));
                }, TIMES_UP_DELAY_MS)
            }).catch((error: string) => {
                setError(error);
            })
        }

        if (timer === 0) {
            endGame().then();
        }
    }, [dispatch, timer, user]);

    return (
        <StyledGameContainer delay={TIMES_UP_DELAY_MS}>
            {error && <p className="error" data-testid="data-patch-error">An error has occurred. Sorry for the inconvenience : {error} </p>}
            {!error && <div className="game_container">
                {game.status === 'idle' && <GameIntroduction updateGameState={startGame}></GameIntroduction>}
                {game.status === 'playing' && <Gameboard></Gameboard>}
                {game.status === 'end' && <Leaderboard></Leaderboard>}

                <CSSTransition in={showTimesUp} unmountOnExit nodeRef={timesUpRef} timeout={0} classNames="timesUp">
                    <p ref={timesUpRef}>Time's up</p>
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
    margin-top: 100px;
    
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
