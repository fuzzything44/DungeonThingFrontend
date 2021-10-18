import { InventoryState, InventoryAction, SET_INVENTORY, SET_EQUIP_INFO, REMOVE_EQUIP, EQUIP_ITEM, CHANGE_ITEM_AMOUNT, SET_GIFTS } from "./types";
import { EquipInfo, ItemInfo } from "../../api/ApiObjects";
import { EQUIP_TYPES } from "../../inventory/itemInfo";

const NULL_EQUIP: EquipInfo = {
    id: -1,
    level: 0,
    max_level: 0,
    rank: "",
    rankId: 0,
    type: 0,
    name: "",
    strength: 0,
    level_cost: 0,
    rank_cost: 0,
    reinforce: 0
}

const initialState: InventoryState = {
    hat: NULL_EQUIP,
    shirt: NULL_EQUIP,
    pants: NULL_EQUIP,
    shoes: NULL_EQUIP,
    weapon: NULL_EQUIP,
    equips: [],
    items: [],
    gifts: []
};

export const equipSorting = (eq1: EquipInfo, eq2: EquipInfo) => eq1.rankId - eq2.rankId;
export const itemSorting = (i1: ItemInfo, i2: ItemInfo) => i1.itemId === i2.itemId ?
    i1.itemData - i2.itemData :
    i1.itemId - i2.itemId;

export function inventoryReducer(state = initialState, action: InventoryAction): InventoryState {
    switch (action.type) {
        case SET_INVENTORY:
            return {
                ...state,
                ...action,
                equips: action.equips.sort(equipSorting)
            };
        case SET_EQUIP_INFO:
            return {
                ...state,
                weapon: state.weapon.id === action.info.id ? action.info : state.weapon,
                hat: state.hat.id === action.info.id ? action.info : state.hat,
                shirt: state.shirt.id === action.info.id ? action.info : state.shirt,
                pants: state.pants.id === action.info.id ? action.info : state.pants,
                shoes: state.shoes.id === action.info.id ? action.info : state.shoes,
                equips: state.equips.map(equip => equip.id === action.info.id ? action.info : equip).sort(equipSorting)
            };
        case REMOVE_EQUIP:
            return {
                ...state,
                equips: state.equips.filter(equip => equip.id !== action.id)
            }
        case EQUIP_ITEM:
            let unequipped: EquipInfo;
            switch (action.item.type) {
                case EQUIP_TYPES.WEAPON:
                    unequipped = state.weapon
                    break;
                case EQUIP_TYPES.HAT:
                    unequipped = state.hat
                    break;
                case EQUIP_TYPES.SHIRT:
                    unequipped = state.shirt
                    break;
                case EQUIP_TYPES.PANTS:
                    unequipped = state.pants
                    break;
                case EQUIP_TYPES.SHOES:
                    unequipped = state.shoes
                    break;
                default:
                    throw new Error("Unknown equip type " + action.item.type);
            }
            return {
                ...state,
                weapon: action.item.type === EQUIP_TYPES.WEAPON ? action.item : state.weapon,
                hat: action.item.type === EQUIP_TYPES.HAT ? action.item : state.hat,
                shirt: action.item.type === EQUIP_TYPES.SHIRT ? action.item : state.shirt,
                pants: action.item.type === EQUIP_TYPES.PANTS ? action.item : state.pants,
                shoes: action.item.type === EQUIP_TYPES.SHOES ? action.item : state.shoes,
                equips: state.equips.map(equip => equip.id === action.item.id ? unequipped : equip).sort(equipSorting)
            }
        case CHANGE_ITEM_AMOUNT:
            const sameItem = (item: ItemInfo) => item.itemData === action.item.itemData &&
                item.itemId === action.item.itemId;
            // If item doesn't exist, add new item. Otherwise, change amount
            const newItems = state.items.findIndex(sameItem) === -1 ?
                [...state.items, { ...action.item, amount: action.newAmount }].sort(itemSorting) :
                state.items.map(item => sameItem(item) ? { ...action.item, amount: action.newAmount } : item);
            return {
                ...state,
                items: newItems.filter(item => item.amount !== 0)
            }
        case SET_GIFTS:
            return {
                ...state,
                gifts: action.gifts
            }
        default:
            ((_: never) => null)(action);
            return state;
    }
}