import styled from "styled-components";
import {memo, type ReactNode} from "react";

export const DataDisplay = memo(function DataDisplay({iconName, children}: { iconName: string, children: ReactNode }) {
    return (
        <StyledDataDisplay className="data">
            <div className="data__icon-container">
                <span className={iconName} aria-label="playerName"></span>
            </div>
            <span className="data__info">{children}</span>
        </StyledDataDisplay>
    )
});

const StyledDataDisplay = styled.div`
    height: 50px;
    width: auto;
    display: flex;
    justify-content: space-around;
    background: var(--white);
    align-items: center;
    border-radius: 5px;

    .data__icon-container {
        background: var(--gradient);
        height: inherit;
        padding-inline: 15px;
        font-family: 'icomoon';
        align-items: center;
        display: flex;
        font-size: 30px;
        color: var(--black);
    }

    .data__info {
        font-size: 25px;
        padding-inline: 25px;
        width: 120px;
        font-family: "Comic Relief", system-ui;

    }
`;