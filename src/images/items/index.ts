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
        require("./rank_orb/base.png"), // Rank orbs start at 1, so we need a placeholder for 0
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
        require("./rank_orb/15.png"),
        require("./rank_orb/16.png"),
        require("./rank_orb/17.png"),
        require("./rank_orb/18.png"),
        require("./rank_orb/19.png"),
        require("./rank_orb/20.png")
    ],
    base: require("./rank_orb/base.png")
};
export const reinforce: ItemFolder = {
    img: [
        require("./reinforce/base.png"), // Coupons start at 1, so we need a placeholder for 0
        require("./reinforce/1.png"),
        require("./reinforce/2.png"),
        require("./reinforce/3.png"),
        require("./reinforce/4.png"),
        require("./reinforce/5.png"),
        require("./reinforce/6.png"),
        require("./reinforce/7.png"),
        require("./reinforce/8.png"),
        require("./reinforce/9.png"),
        require("./reinforce/10.png"),
        require("./reinforce/11.png"),
        require("./reinforce/12.png"),
        require("./reinforce/13.png"),
        require("./reinforce/14.png"),
        require("./reinforce/15.png"),
        require("./reinforce/16.png"),
        require("./reinforce/17.png"),
        require("./reinforce/18.png"),
        require("./reinforce/19.png"),
        require("./reinforce/20.png"),
        require("./reinforce/21.png"),
        require("./reinforce/22.png"),
        require("./reinforce/23.png"),
        require("./reinforce/24.png"),
        require("./reinforce/25.png")
    ],
    base: require("./reinforce/base.png")
};

export const totem: ItemFolder = {
    img: [],
    base: require("./totem/base.png")
}