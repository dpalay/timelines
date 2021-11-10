import { EventCategories } from "./EventCategories";

export interface TimeEvent {
    date: Date;
    name: string;
    categories: EventCategories[];
}

