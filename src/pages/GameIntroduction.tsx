import styled from "styled-components";
import {type FormEvent, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../stores/user.ts";
import {Button} from "../components/Button.tsx";
import type {RootState} from "../stores";

export function GameIntroduction({updateGameState}: { updateGameState: () => void }) {
    const dispatch = useDispatch()
    const playerName = useRef<HTMLInputElement>(null);
    const game = useSelector((state: RootState) => state.game);

    function onStart(e: FormEvent) {
        e.preventDefault();

        if (playerName.current?.value) {
            dispatch(userActions.setUsername(playerName.current.value))
            updateGameState()
        }
    }

    return (
        <StyledGameIntroduction data-testid="game-introduction-component" className="game-introduction">
            <img className="game-introduction__title" src="/logo.png" alt="Whack a mole"/>
            <div className="game-introduction__container">
                <p>You have 2 minutes to whack as maximum of mole as possible</p>
                <p>Each time you whack a mole, you will gain {game.scoreUpdate} points </p>

                <form className='game-introduction__form' onSubmit={onStart}>
                    <label htmlFor="player-name">Please enter your name</label>
                    <input data-testid="game-introduction__form-input" id="player-name" className="game-introduction__input" ref={playerName} type="text" required maxLength={15}></input>
                    <Button data-testid="game-introduction__form-button">Play</Button>
                </form>
            </div>
        </StyledGameIntroduction>
    )
}

const StyledGameIntroduction = styled.section`
    text-align: center;
    align-self: center;
    display: flex;
    flex-direction: column;
    font-family: 'Comic Relief', sans-serif;
    font-size: 16px;

    .game-introduction__title {
        width: 300px;
        height: auto;
        margin: 0 auto 10px auto;
    }

    .game-introduction__container {
        background: rgba(255, 255, 255, 0.8);
        padding: 20px;
    }

    .game-introduction__input {
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 10px;
        font-size: 18px;
        font-family: inherit;

    }

    .game-introduction__form {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
    }


`
