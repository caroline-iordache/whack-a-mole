import type {MoleType} from "../types/Mole.ts";
import styled from "styled-components";
import {CSSTransition} from "react-transition-group";
import {memo, useRef} from "react";

export const Mole = memo(function Mole({mole, onMoleClick, scoreUpdate}: {
    mole: MoleType,
    onMoleClick: (mole: MoleType) => void,
    scoreUpdate: number
}) {
    const scoreUpRef = useRef<HTMLDivElement>(null);

    return (
        <StyledMole>
            {!mole.isHidden && !mole.isTouched &&
                <img src='/WAM_Mole.png' alt='Mole' onClick={() => onMoleClick(mole)}/>}

            {!mole.isHidden && mole.isTouched &&
                <img src='/WAM_Mole_touched.png' alt='Hole'/>}

            {mole.isHidden &&
                <img src='/WAM_Hole.png' alt='Hole'/>}

            <CSSTransition className="scoreUp" in={mole.isTouched} unmountOnExit nodeRef={scoreUpRef} timeout={0}
                           classNames="scoreUp">
                <span ref={scoreUpRef}>+ {scoreUpdate}</span>
            </CSSTransition>

        </StyledMole>
    )
});

const StyledMole = styled.div`
    position: relative;

    .scoreUp {
        padding: 10px;
        background: var(--gradient);
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        color: var(--black);
        transition: font-size 100ms;
        font-family: "Comic Relief", system-ui;
        display: flex;
        border-radius: 5px;
    }

    .scoreUp-enter-done {
        font-size: 30px;
    }

`
