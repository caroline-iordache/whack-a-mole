import styled from "styled-components";
import {useSelector} from "react-redux";
import {DataDisplay} from "./DataDispay.tsx";
import type {ReactNode} from "react";
import type {RootState} from "../stores";


export function PlayerData({children}: { children: ReactNode }) {
    const user = useSelector((state:RootState) => state.user);

    return (
        <StyledPlayerData>
            <DataDisplay iconName={'icon-cool2'} width={320}>
                {user.username}
            </DataDisplay>

            <DataDisplay iconName={'icon-dice'}>
                {user.score}
            </DataDisplay>

            <DataDisplay iconName={'icon-clock2'}>
                {children}
            </DataDisplay>
        </StyledPlayerData>
    )
}

const StyledPlayerData = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 50px;
    margin-bottom: 50px;
`;