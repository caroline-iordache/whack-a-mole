import {useEffect, useState} from "react";

export function Timer() {
    /**
     * Set timerState in second
     */
    const [timer, setTimer] = useState<number>(120);

    if (timer === 0) {
        // TODO : FinishGame
    }

    function getTimerInMinutes() {
        const minutes = Math.floor(timer / 60);
        const seconds = timer - minutes * 60;

        return `${minutes} : ${seconds}`
    }

    useEffect(() => {

        const timerIntervalId = setInterval(() => {
            setTimer(timing => timing - 1)
        }, 1000)

        return () => clearInterval(timerIntervalId);
    }, []);

    return (
        <div className="timer">
            <p>{getTimerInMinutes()}</p>
        </div>
    )
}