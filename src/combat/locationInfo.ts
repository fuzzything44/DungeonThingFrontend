export interface LocationInfo {
    backgroundImage: string;
    enemyImage: string;
    enemyName: string;
    bossImage: string;
    bossName: string;
    enemyHp: number;
    dungeonName: string;
}

const linearExponentialScaling = (linearScale: number, base: number, exponentialScale: number, floor: number): number => {
    return (linearScale * floor - 1) + Math.ceil(base * Math.pow(exponentialScale, floor - 1));
}

export const getLocationInfo = (dungeonId: number, dungeonFloor: number): LocationInfo => {
    switch (dungeonId) {
        case 1:
            return {
                backgroundImage: require("../images/tavern_repeat.png"),
                enemyImage: require("../images/barrel.png"),
                enemyName: "barrel",
                bossImage: require("../images/mana.png"),
                bossName: "giant rat",
                enemyHp: linearExponentialScaling(5, 25, 1.05, dungeonFloor),
                dungeonName: "Tavern Cellar"
            };
        case 2:
            return {
                backgroundImage: require("../images/login.png"),
                enemyImage: require("../images/mana.png"),
                enemyName: "suit of armor",
                bossImage: require("../images/ticket.png"),
                bossName: "floating sword",
                enemyHp: linearExponentialScaling(5, 5, 1.05, dungeonFloor),
                dungeonName: "Armory"
            };
        default:
            return {
                backgroundImage: "",
                enemyImage: "",
                enemyName: "",
                bossImage: "",
                bossName: "",
                enemyHp: 1,
                dungeonName: "???"
            };
    }
};