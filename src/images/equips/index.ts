interface EquipSets {
    broken: string;
    damaged: string;
    normal: string;
}

export const equipImages: EquipSets[] = [
    // Weapons
    {
        broken:  require("./0/broken.png"),
        damaged: require("./0/damaged.png"),
        normal:  require("./0/normal.png")
    },
    // Hats
    {
        broken:  require("./1/broken.png"),
        damaged: require("./1/damaged.png"),
        normal:  require("./1/normal.png")
    },
    // Shirts
    {
        broken:  require("./2/broken.png"),
        damaged: require("./2/damaged.png"),
        normal:  require("./2/normal.png")
    },
    // Pants
    {
        broken:  require("./3/broken.png"),
        damaged: require("./3/damaged.png"),
        normal:  require("./3/normal.png")
    },
    // Shoes
    {
        broken:  require("./4/broken.png"),
        damaged: require("./4/damaged.png"),
        normal:  require("./4/normal.png")
    },
];