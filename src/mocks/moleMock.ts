import type {MoleType} from "../types/Mole.ts";

export const moleMockHidden: MoleType = {
    id: "1",
    isHidden: true,
    isTouched: false
}

export const moleMockNotTouched: MoleType = {
    id: "1",
    isHidden: false,
    isTouched: false
}

export const moleMockTouched: MoleType = {
    id: "1",
    isHidden: false,
    isTouched: true
}