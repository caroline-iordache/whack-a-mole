import styled from "styled-components";
import type {ReactNode} from "react";

export function Button({children, onClick}: { children: ReactNode, onClick: () => void }) {
    return (
        <StyledButton onClick={onClick}>
            {children}
        </StyledButton>
    )
}


const StyledButton = styled.button`
    width: 100%;
    background: var(--gradient);
    border-radius: 3px;
    border: 1px solid var(--secondary-color);
    cursor: pointer;
    color: var(--black);
    font-size: 17px;
    padding: 11px 47px;
    font-family: inherit;

    &:hover {
        background: var(--gradient-reverse)
    }
`
