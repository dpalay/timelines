import { atom } from "recoil";


export const ScoreState =  atom<number>({
    key: 'ScoreState',
    default: 0
});