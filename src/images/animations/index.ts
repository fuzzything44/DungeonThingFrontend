export interface EnemyImages {
    boss: {
        entering: string[];
        attacking: string[];
        dying: string[];
    },
    regular: {
        base: string;
        dying: string[]
    }
}

export const player_attacking: string[] = [
    require("./player_attacking/1.png"),
    require("./player_attacking/2.png"),
    require("./player_attacking/3.png"),
    require("./player_attacking/4.png"),
    require("./player_attacking/5.png"),
    require("./player_attacking/6.png"),
    require("./player_attacking/7.png"),
    require("./player_attacking/8.png"),
    require("./player_attacking/9.png"),
    require("./player_attacking/10.png"),
    require("./player_attacking/11.png"),
    require("./player_attacking/12.png"),
    require("./player_attacking/13.png"),
    require("./player_attacking/14.png"),
    require("./player_attacking/15.png")

];

export const player_standing: string[] = [
    require("./player_standing/1.png"),
    require("./player_standing/2.png"),
    require("./player_standing/3.png"),
    require("./player_standing/4.png"),
    require("./player_standing/5.png"),
    require("./player_standing/6.png"),
    require("./player_standing/1.png"),
    require("./player_standing/2.png"),
    require("./player_standing/3.png"),
    require("./player_standing/4.png"),
    require("./player_standing/5.png"),
    require("./player_standing/6.png")
];

export const player_walking: string[] = [
    require("./player_walking/1.png"),
    require("./player_walking/2.png"),
    require("./player_walking/3.png"),
    require("./player_walking/4.png"),
    require("./player_walking/5.png"),
    require("./player_walking/6.png"),
    require("./player_walking/7.png"),
    require("./player_walking/8.png"),
    require("./player_walking/9.png"),
    require("./player_walking/10.png"),
    require("./player_walking/11.png"),
    require("./player_walking/12.png"),
    require("./player_walking/13.png"),
    require("./player_walking/14.png"),
    require("./player_walking/15.png"),
    require("./player_walking/1.png"),
    require("./player_walking/2.png"),
    require("./player_walking/3.png"),
    require("./player_walking/4.png"),
    require("./player_walking/5.png"),
    require("./player_walking/6.png"),
    require("./player_walking/7.png"),
    require("./player_walking/8.png"),
    require("./player_walking/9.png"),
    require("./player_walking/10.png"),
    require("./player_walking/11.png"),
    require("./player_walking/12.png"),
    require("./player_walking/13.png"),
    require("./player_walking/14.png"),
    require("./player_walking/15.png")
];

// This is just to get typing right
// So that all properties are EnemyImages, and no extra properties can be accessed.
interface EnemyImageMap {
    [dungeon: string]: EnemyImages;
}
const createEnemyImageMap = <M extends EnemyImageMap>(things: M) => things;

export const enemy = createEnemyImageMap({
    cellar: {
        boss: {
            attacking: [require("./enemy/cellar/boss/attacking.png")],
            dying: [require("./enemy/cellar/boss/dying.png")],
            entering: [require("./enemy/cellar/boss/entering.png")]
        },
        regular: {
            base: require("./enemy/cellar/normal/base.png"),
            dying: [
                require("./enemy/cellar/normal/1.png"),
                require("./enemy/cellar/normal/2.png"),
                require("./enemy/cellar/normal/3.png"),
                require("./enemy/cellar/normal/4.png"),
                require("./enemy/cellar/normal/5.png"),
                require("./enemy/cellar/normal/6.png"),
                require("./enemy/cellar/normal/7.png"),
                require("./enemy/cellar/normal/8.png"),
                require("./enemy/cellar/normal/9.png"),
                require("./enemy/cellar/normal/10.png"),
                require("./enemy/cellar/normal/11.png"),
                require("./enemy/cellar/normal/12.png"),
                require("./enemy/cellar/normal/13.png"),
                require("./enemy/cellar/normal/14.png"),
                require("./enemy/cellar/normal/15.png"),
                require("./enemy/cellar/normal/16.png"),
                require("./enemy/cellar/normal/17.png"),
                require("./enemy/cellar/normal/18.png"),
                require("./enemy/cellar/normal/19.png"),
                require("./enemy/cellar/normal/20.png"),
                require("./enemy/cellar/normal/21.png"),
                require("./enemy/cellar/normal/22.png"),
                require("./enemy/cellar/normal/23.png"),
                require("./enemy/cellar/normal/24.png"),
            ]
        }
    }
});