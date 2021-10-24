import { EnemyImages, enemy } from "../images/animations";

export interface LocationInfo {
    backgroundImage: string;
    enemyName: string;
    bossName: string;
    enemyHp: number;
    dungeonName: string;
    enemyImages: EnemyImages
}

const linearExponentialScaling = (linearScale: number, base: number, exponentialScale: number, floor: number): number => {
    return (linearScale * floor - 1) + Math.ceil(base * Math.pow(exponentialScale, floor - 1));
}

export const DUNGEONS = {
    TAVERN_CELLAR: 1,
    ARMORY: 2
}

export const getLocationInfo = (dungeonId: number, dungeonFloor: number): LocationInfo => {
    switch (dungeonId) {
        case DUNGEONS.TAVERN_CELLAR:
            return {
                backgroundImage: require("../images/tavern_repeat.png"),
                enemyName: "barrel",
                bossName: dungeonFloor !== 100 ? "giant rat" : "Mavrith",
                enemyHp: linearExponentialScaling(5, 25, 1.05, dungeonFloor),
                dungeonName: "Tavern Cellar",
                enemyImages: dungeonFloor !== 100 ? enemy.cellar : enemy.cellar
            };
        case DUNGEONS.ARMORY:
            return {
                backgroundImage: require("../images/armory_repeat.png"),
                enemyName: "suit of armor",
                bossName: "floating sword",
                enemyHp: linearExponentialScaling(5, 5, 1.05, dungeonFloor),
                dungeonName: "Armory",
                enemyImages: enemy.armory
            };
        default:
            return {
                backgroundImage: "",
                enemyName: "",
                bossName: "",
                enemyHp: 1,
                dungeonName: "???",
                enemyImages: {
                    boss: {
                        attacking: [""],
                        dying: [""],
                        entering: [""]
                    },
                    regular: {
                        base: "",
                        dying: [""]
                    }
                }
            };
    }
};

