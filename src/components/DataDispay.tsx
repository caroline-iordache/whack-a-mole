import styled from "styled-components";
import {memo, type ReactNode} from "react";

export const DataDisplay = memo(function DataDisplay({iconName, children, width}: { iconName: string, children: ReactNode, width?: number  }) {
    return (
        <StyledDataDisplay className="data" width={width}>
            <div className="data__icon-container">
                <span className={iconName} aria-label="playerName"></span>
            </div>
            <span className="data__info">{children}</span>
        </StyledDataDisplay>
    )
});

const StyledDataDisplay = styled.div<{width?: number}>`
    height: 50px;
    width: auto;
    display: flex;
    justify-content: space-around;
    background: var(--white);
    align-items: center;
    border-radius: 5px;

    .data__icon-container {
        font-family: 'icomoon';
        background: var(--gradient);
        height: inherit;
        padding-inline: 15px;
        align-items: center;
        display: flex;
        font-size: 30px;
        color: var(--black);
    }

    .data__info {
        font-size: 25px;
        padding-inline: 25px;
        width: ${({ width }) => width ? `${width}px` : '80px'};
        font-family: "Comic Relief", system-ui;

    }
`;