import styled from "styled-components";
import {useEffect, useState} from "react";
import type {Mole} from "../types/Mole.ts";

export function Gameboard() {

    const MOLES_NUMBER = 12;
    const MOLE_VISIBILITY_MS = 1000;
    const MOLE_DISPLAY_INTERVAL_MS = 3000;

    const [moles, setMoles] = useState<Mole[]>(() =>
        Array.from({length: MOLES_NUMBER}, () => ({
            id: crypto.randomUUID(),
            isHidden: true,
            isTouched: false
        }))
    );

    useEffect(() => {
        /**
         * Toggle the mole visibility by changing its isHidden property
         * @param moleIndex The index of the mole to display
         * @param isHidden Whether the mole should be hidden or not
         */
        function toggleMoleVisibility(moleIndex: number, isHidden: boolean): void {
            setMoles(prevMoles => prevMoles.map((mole: Mole, index: number) => {
                if (moleIndex === index) {
                    return {...mole, isHidden, isTouched: false};
                }
                return {...mole};
            }));
        }

        /**
         * Add an interval to set the mole visible (MOLE_VISIBILITY_MS)
         * Add a timeout to hidde the mole (MOLE_DISPLAY_INTERVAL_MS)
         */
        function addMoleVisibilityInterval() {
            const visibilityIntervalId = setInterval(() => {
                const moleToShowIndex = Math.floor(Math.random() * MOLES_NUMBER);
                toggleMoleVisibility(moleToShowIndex, false)

                setTimeout(() => {
                    toggleMoleVisibility(moleToShowIndex, true)
                }, MOLE_VISIBILITY_MS)

                return () => clearInterval(visibilityIntervalId);
            }, MOLE_DISPLAY_INTERVAL_MS)
        }
        addMoleVisibilityInterval()
    }, []);

    return (
        <StyledGameboard>
            <div className="gameboard">
                <ul className="gameboard__list">
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
        background-size: 100% 100%; 

        &__list {
            list-style: none;
            display: grid;
            justify-content: end;
            align-items: end;
            grid-gap: 50px;
            grid-template-columns: repeat(4, auto);
            grid-template-rows: 150px 150px 150px;
        }
    }
`;