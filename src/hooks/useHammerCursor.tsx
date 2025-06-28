import {useEffect, useState} from "react";

export function useHammerCursor() {

    useEffect(() => {
        const handleMouseDown = () => {

            document.body.classList.add('hammer-clicked-cursor');
        };

        const handleMouseUp = () => {
            document.body.classList.remove('hammer-clicked-cursor');
        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        }
    }, []);
}