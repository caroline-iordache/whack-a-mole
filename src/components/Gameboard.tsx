import styled from "styled-components";
import {useState} from "react";
import type {Mole} from "../types/Mole.ts";

export function Gameboard() {

    const MOLES_NUMBER = 12;

    const [moles, setMoles] = useState<Mole[]>(() =>
        Array.from({length: MOLES_NUMBER}, () => ({
            id: crypto.randomUUID(),
            isHidden: true,
            isTouched: false
        }))
    );


    return (
        <StyledGameboard>
            <div className="gameboard">
                <ul className="gameboard-list">
                    {moles.map((mole: Mole) => (
                        <li key={mole.id}>
                            {!mole.isHidden && <img src='WAM_Mole.png' alt='Mole'/>}
                            {mole.isHidden && <img src='WAM_Hole.png' alt='Hole'/>}
                        </li>
                    ))}
                </ul>
            </div>
        </StyledGameboard>
    )
}

const StyledGameboard = styled.div`
    .gameboard {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        background-image: url("WAM_bg.jpg");
        background-size: cover;

        &-list {
            list-style: none;
            display: grid;
            grid-gap: 10px;
            grid-template-columns: repeat(4, auto);
        }
    }
`;