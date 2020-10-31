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

export const getLocationInfo = (dungeonId: number, dungeonFloor: number): LocationInfo => {
    switch (dungeonId) {
        case 1:
            return {
                backgroundImage: require("../images/tavern_repeat.png"),
                enemyName: "barrel",
                bossName: "giant rat",
                enemyHp: linearExponentialScaling(5, 25, 1.05, dungeonFloor),
                dungeonName: "Tavern Cellar",
                enemyImages: enemy.cellar
            };
        case 2:
            return {
                backgroundImage: require("../images/login.png"),
                enemyName: "suit of armor",
                bossName: "floating sword",
                enemyHp: linearExponentialScaling(5, 5, 1.05, dungeonFloor),
                dungeonName: "Armory",
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