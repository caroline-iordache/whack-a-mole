import styled from "styled-components";
import {useSelector} from "react-redux";
import {DataDisplay} from "./DataDispay.tsx";

export function PlayerData({score, children}: { score: number, children: any }) {
    const user = useSelector((state) => state.user);

    return (
        <StyledPlayerData>
            <DataDisplay iconName={'icon-cool2'}>
                {user.username}
            </DataDisplay>

            <DataDisplay iconName={'icon-dice'}>
                <span className="data__info">{score}</span>
            </DataDisplay>

            <DataDisplay iconName={'icon-clock2'}>
                <span className="data__info"> {children}</span>
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