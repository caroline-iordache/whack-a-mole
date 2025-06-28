import type {GameStatus} from "../types/GameStatus.ts";
import styled from "styled-components";
import {type FormEvent, useRef} from "react";
import {useDispatch} from "react-redux";
import {userActions} from "../stores/user.ts";

export function GameIntroduction({updateGameState}: { updateGameState: (status: GameStatus) => void }) {
    const dispatch = useDispatch()
    const playerName = useRef<HTMLInputElement>(null);

    function onStart(e: FormEvent) {
        e.preventDefault();

        if (playerName.current?.value) {
            dispatch(userActions.setUsername(playerName.current.value))
            updateGameState('playing')
        }
    }

    return (
        <StyledGameIntroduction className="game-introduction">
            <img className="game-introduction__title" src="/logo.png" alt="Whack a mole"/>
            <div className="game-introduction__container">
                <p>You have 2 minutes to whack as maximum of mole as possible</p>
                <p>Each time you whack a mole, you will gain 100 points </p>

                <form className='game-introduction__form' onSubmit={onStart}>
                    <label htmlFor="player-name">Please enter your name</label>
                    <input id="player-name" className="game-introduction__input" ref={playerName} type="text" required></input>
                    <button className="game-introduction__button">Play</button>
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
        font-family: 'Comic Relief', sans-serif;

    }

    .game-introduction__button {
        width: 100%;
        background: linear-gradient(to bottom, var(--primary-color) 5%, var(--secondary-color) 100%);
        border-radius: 3px;
        border: 1px solid var(--secondary-color);
        cursor: pointer;
        color: var(--black);
        font-size: 17px;
        padding: 11px 47px;
        font-family: 'Comic Relief', sans-serif;

        &:hover {
            background: linear-gradient(to bottom, var(--secondary-color) 5%, var(--primary-color) 100%);
        }
    }

    .game-introduction__form {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
    }


`
