import { atom } from "recoil";
import { EventCategories } from "../Model";


export const ScoreState =  atom<number>({
    key: 'ScoreState',
    default: 0
});

export const CategoriesState = atom<EventCategories[]>({
    key: 'CategoriesState',
    default: [EventCategories.VideoGames, EventCategories.Movies]
})
