import type {MoleType} from "../types/Mole.ts";
import styled from "styled-components";

export function Mole({mole, onMoleClick, scoreUpdate}: {
    mole: MoleType,
    onMoleClick: (moleId: string) => void,
    scoreUpdate: number
}) {
    return (
        <StyledMole>
            {!mole.isHidden &&
                <img src='/WAM_Mole.png' alt='Mole' onClick={() => onMoleClick(mole.id)}/>}
            {mole.isHidden && <img src='/WAM_Hole.png' alt='Hole'/>}

            {mole.isTouched && <span className='scoreUpdate'>+ {scoreUpdate}</span>}

        </StyledMole>
    )
}

const StyledMole = styled.div`
    position: relative;

    .scoreUpdate {
        padding: 10px;
        background-color: #8E6C60;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        font-size: 30px;
        color: white;
    }
`
