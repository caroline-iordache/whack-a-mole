import type {GameStatus} from "../types/GameStatus.ts";
import styled from "styled-components";
import {type RefObject, useRef} from "react";
import {useForm} from "react-hook-form";

export function GameIntroduction({updateGameState}: { updateGameState: (status: GameStatus) => void }) {
    const playerName: RefObject<HTMLInputElement | null> = useRef(null);
    const {handleSubmit} = useForm();

    function onStart() {
        if (playerName?.current?.value) {
            updateGameState('playing')
        }
    }

    return (
        <StyledGameIntroduction>
            <div className="game-introduction">
                <p>Intro</p>
                <p>You have 2 minutes to whack as maximum of whole as possible</p>
                <p>Each time you whack a mole, you will gain 100 points </p>

                <p></p>
                <form className='game-introduction__form' onSubmit={handleSubmit(onStart)}>
                    <label htmlFor="playerName">Please enter your name</label>
                    <input id='playerName' ref={playerName} type="text" required></input>
                    <button className="form__button">Play</button>
                </form>

            </div>
        </StyledGameIntroduction>
    )
}

const StyledGameIntroduction = styled.section`
    background-color: red;
    text-align: center;
    padding: 20px;
    align-self: center;
    display: flex;

    .game-introduction__form {
        display: flex;
        flex-direction: column;

        .form__button {
            appearance: none;
            width: 100%;
            background-color: red;
            border: none;
        }
    }
`
