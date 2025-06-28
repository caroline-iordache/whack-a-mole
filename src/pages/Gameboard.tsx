import styled from "styled-components";
import {useEffect, useState} from "react";
import type {MoleType} from "../types/Mole.ts";
import {PlayerData} from "../components/PlayerData.tsx";
import {Mole} from "../components/Mole.tsx";
import {Timer} from "../components/Timer.tsx";
import {userActions} from "../stores/user.ts";
import {useDispatch, useSelector} from "react-redux";

export function Gameboard() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user);
    const timer = useSelector((state) => state.timer);

    const MOLES_NUMBER = 12;
    const SCORE_INCREMENTATION = 100;
    const MOLE_VISIBILITY_MS = 3000;
    const MOLE_DISPLAY_INTERVAL_MS = 3000;

    const [moles, setMoles] = useState<MoleType[]>(() =>
        Array.from({length: MOLES_NUMBER}, () => ({
            id: crypto.randomUUID(),
            isHidden: true,
            isTouched: false
        }))
    );

    /**
     * When a mole is clicked:
     * - Whack the mole
     * - update the score
     * - Change manually the visibility to show the score update
     * @param mole the whacked mole
     */
    function onMoleClick(mole: MoleType): void {
        if (!mole.isTouched && timer !== 0) {
            whackMole(mole.id);
            updateScore();
            setTimeout(() => {
                setMoles(prevMoles => prevMoles.map((mole: MoleType) => {
                    return {...mole, isHidden: true, isTouched: false};
                }));
            }, 2000)
        }

    }

    /**
     * When mole is whack set isTouched to true
     * @param moleId the whacked mole id
     */
    function whackMole(moleId: string) {
        setMoles(prevMole => prevMole.map(mole => {
                if (mole.id === moleId) {
                    return {...mole, isTouched: true}
                }
                return {...mole}
            })
        )
    }

    /**
     * Update the score to 100
     */
    function updateScore() {
        dispatch(userActions.updateUserScore(SCORE_INCREMENTATION));
    }

    useEffect(() => {
        /**
         * Toggle the mole visibility by changing its isHidden property
         * @param moleIndex The index of the mole to display
         * @param hideMole Whether the mole should be hidden or not
         */
        function toggleMoleVisibility(moleIndex: number, hideMole: boolean): void {
            setMoles(prevMoles => prevMoles.map((mole: MoleType, index: number) => {
                if (moleIndex === index && !mole.isTouched) {
                    return {...mole, isHidden: hideMole};
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
                <div className="gameboard__container">
                    <PlayerData score={user.score}> <Timer></Timer></PlayerData>
                    <ul className="gameboard__list">
                        {moles.map((mole: MoleType) => (
                            <li key={mole.id}>
                                <Mole mole={mole} onMoleClick={onMoleClick} scoreUpdate={SCORE_INCREMENTATION}></Mole>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </StyledGameboard>
    )
}

const StyledGameboard = styled.div`
    .gameboard {
        &__list {
            list-style: none;
            display: grid;
            align-items: end;
            grid-gap: 50px;
            grid-template-columns: repeat(4, auto);
            grid-template-rows: 150px 150px 150px;
            padding-left: 0;
        }
    }
`;