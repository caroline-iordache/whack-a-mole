import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {timerActions} from "../stores/timer.ts";
import type {RootState} from "../stores";

export function Timer() {
    const timer = useSelector((state:RootState) => state.timer);
    const dispatch = useDispatch()

    function getTimerInMinutes() {
        const minutes = Math.floor(timer / 60);
        const seconds = timer - minutes * 60;
        const secondWith0 = (seconds < 10 ? '0' : '') + seconds;

        return `${minutes} : ${secondWith0}`
    }

    useEffect(() => {
        const timerIntervalId = setInterval(() => {
            dispatch(timerActions.updateTimer());
        }, 1000)

        return () => clearInterval(timerIntervalId);
    }, [dispatch]);

    return (
        <div className="timer">
            <p data-testid="timer">{getTimerInMinutes()}</p>
        </div>
    )
}