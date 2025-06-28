import {useEffect, useState} from "react";
import type {GameStatus} from "../types/GameStatus.ts";

export function Timer({updateGameState}: { updateGameState: (status: GameStatus) => void }) {
    /**
     * Set timerState in second
     */
    const [timer, setTimer] = useState<number>(20);

    useEffect(() => {
        if (timer === 0) {
            //updateGameState('end');
        }
    }, [timer, updateGameState]);

    function getTimerInMinutes() {
        const minutes = Math.floor(timer / 60);
        const seconds = timer - minutes * 60;
        const secondWith0 = (seconds < 10 ? '0' : '') + seconds;

        return `${minutes} : ${secondWith0}`
    }

    useEffect(() => {

        const timerIntervalId = setInterval(() => {
            setTimer(prevTiming => {
                if (prevTiming > 0) {
                    return prevTiming - 1
                }
                return prevTiming;
            })
        }, 1000)

        return () => clearInterval(timerIntervalId);
    }, []);

    return (
        <div className="timer">
            <p>{getTimerInMinutes()}</p>
        </div>
    )
}