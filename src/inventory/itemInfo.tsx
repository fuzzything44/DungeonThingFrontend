import { ItemFolder, rank_orb, reinforce, none, totem } from "../images/items";
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
    CONSTRUCTION_MATERIAL: 4
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
            return {
                name: "Coming Soon!",
                imageFolder: none,
                description: "This will be a unique series of items mainly used for upgrading guild bonuses. They'll be acquired from a new dungeon!"
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