import styled from "styled-components";

export function PlayerData({score}: { score: number }) {
    return (
        <StyledPlayerData>
            <p className="playerName">playerName</p>
            <p className="score">Score: {score}</p>
        </StyledPlayerData>
    )
}

const StyledPlayerData = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 2em;
    
    .score {
        background-color: red;
        padding: 20px;
        border-radius: 5px;
        align-self: end;
    }
    
    .playerName {
        color: white;
        
    }
`;