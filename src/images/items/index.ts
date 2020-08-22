export interface ItemFolder {
    img: string[];
    base: string;
}

export const none: ItemFolder = {
    img: [],
    base: require("../default.png")
}

export const rank_orb: ItemFolder = {
    img: [
        require("./rank_orb/1.png"),
        require("./rank_orb/2.png"),
        require("./rank_orb/3.png"),
        require("./rank_orb/4.png"),
        require("./rank_orb/5.png"),
        require("./rank_orb/6.png"),
        require("./rank_orb/7.png"),
        require("./rank_orb/8.png"),
        require("./rank_orb/9.png"),
        require("./rank_orb/10.png"),
        require("./rank_orb/11.png"),
        require("./rank_orb/12.png"),
        require("./rank_orb/13.png"),
        require("./rank_orb/14.png"),
        require("./rank_orb/15.png")
    ],
    base: require("./rank_orb/base.png")
};
export const reinforce: ItemFolder = {
    img: [
        require("./reinforce/1.png"),
        require("./reinforce/2.png"),
        require("./reinforce/3.png"),
        require("./reinforce/4.png"),
        require("./reinforce/5.png")
    ],
    base: require("./reinforce/base.png")
};