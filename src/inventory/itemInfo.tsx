import { ItemFolder, rank_orb, reinforce, none, totem, construction, reality, gem_coupon, money_coupon } from "../images/items";
import { equipImages } from "../images/equips";

export const EQUIP_TYPES = {
    WEAPON: 0,
    HAT: 1,
    SHIRT: 2,
    PANTS: 3,
    SHOES: 4
}

export const ITEM_MAPPINGS = {
    RANK_ORB: 1,
    REINFORCE_COUPON: 2,
    ELEMENT_TOTEM: 3,

    CONSTRUCTION_MATERIAL: 4,
    FLOOR_100_DROPS: 5,
    GEM_COUPON: 6,
    MONEY_EXCHANGE: 7
}

interface FullItemInformation {
    name: string;
    imageFolder: ItemFolder;
    description: string;
    useOptions?: string[]
}

export const standardBorderColors = (rank: number): string => {
    const COLORS = ["gray", "green", "blue", "mediumorchid", "red", "deeppink"];
    const tier = Math.floor((rank - 1) / 5);
    return COLORS[Math.min(tier, COLORS.length - 1)];
}

export function getItemInformation(id: number, data: number): FullItemInformation {
    switch (id) {
        case ITEM_MAPPINGS.RANK_ORB:
            return {
                name: "Rank up orb +" + data.toString(),
                imageFolder: rank_orb,
                description: "This orb can be used to rank up equipment of the same rank.\n" +
                    "Rank orbs are acquired through destroying equipment."
            };
        case ITEM_MAPPINGS.REINFORCE_COUPON:
            return {
                name: "Reinforce coupon +" + data.toString(),
                imageFolder: reinforce, 
                description: "This is a coupon used to reinforce equipment, along with a small amount of mana. Higher rank coupons give a higher chance of success."
            };
        case ITEM_MAPPINGS.ELEMENT_TOTEM:
            return {
                name: "Elemental Mastery Totem",
                imageFolder: totem,
                description: "This is a totem used to change your mastered element, allowing you to acquire and use skills of that element. Use it to choose an element to align with. \nFire tends to focus around dealing as much damage as possible, even to the detriment of your  own health.\nWater focuses around healing and slowing your opponent.\nEarth focuses around preventing and reducing damage you take.\nAir focuses around increasing your own stats.",
                useOptions: ["fire", "water", "earth", "air"]
            };
        case ITEM_MAPPINGS.CONSTRUCTION_MATERIAL:
            switch (data) {
                case 1:
                    return {
                        name: "Oak Logs",
                        description: "Sturdy oak logs, perfect for building with.",
                        imageFolder: construction
                    }
                case 2:
                    return {
                        name: "Bricks",
                        description: "A small pile of high-quality bricks to build with.",
                        imageFolder: construction
                    }
                case 3:
                    return {
                        name: "Magic Logs",
                        description: "The tree grew in a swamp with an unusual amount of mana in the water. A much sought-after building material.",
                        imageFolder: construction
                    }
                case 4:
                    return {
                        name: "Marble Slab",
                        description: "Oh my, how fancy. Whatever you build with this will look great!",
                        imageFolder: construction
                    }
                default:
                    return {
                        name: "Unknown material",
                        description: "This is some unknown construction-related material. If you're seeing this, there's probably a bug somewhere.",
                        imageFolder: construction
                    }
            }
        case ITEM_MAPPINGS.FLOOR_100_DROPS:
            return {
                name: "Reality " + ["", "Fragment", "Shard", "Piece"][data],
                description: "A part of the fabric of reality, made solid. These are exceedingly difficult to create, but can be incredibly powerful.",
                imageFolder: reality
            }
        case ITEM_MAPPINGS.GEM_COUPON:
            switch (data) {
                case 1:
                    return {
                        name: "Gem Coupon - Sapphire",
                        description: "Use this coupon to acquire a sapphire gemstone to slot into your equipment.",
                        imageFolder: gem_coupon
                    }
                default:
                    return {
                        name: "Unknown gem coupon",
                        description: "This is a gem coupon, but I don't know what gem it's for. If you're seeing this, it's probably a bug.",
                        imageFolder: gem_coupon
                    }
            }
        case ITEM_MAPPINGS.MONEY_EXCHANGE:
            const resource = ["", "Mana", "Gold"][data];
            return {
                name: resource + " exchange voucher",
                description: "On use, gives 1 " + resource + ". Hopefully you have a lot of these. ",
                imageFolder: money_coupon
            }
        default:
            return {
                name: "Unknown item " + id.toString() + " +" + data.toString(), imageFolder: none, description: "???"
            };
    }
}

export function getEquipImage(type: number, rank: number): string {
    switch (rank) {
        case 1:
            return equipImages[type].broken;
        case 2:
            return equipImages[type].damaged;
        default:
            return equipImages[type].normal;
    }
}