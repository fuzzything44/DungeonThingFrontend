import { PAGES } from '../pages';

const BASE_LOCATIONS = {
    TAVERN: "/tavern",
    TOWN: "/town",
    FORGE: "/forge",
    GUILD: "/guild"
}

export const LOCATIONS: typeof BASE_LOCATIONS = Object.keys(BASE_LOCATIONS).reduce((obj: any, key) => {
    obj[key] = PAGES.LOCATION + BASE_LOCATIONS[key as keyof typeof BASE_LOCATIONS];
    return obj;
}, {}) as typeof BASE_LOCATIONS;
