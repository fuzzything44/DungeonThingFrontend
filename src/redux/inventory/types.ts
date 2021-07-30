import { ItemInfo, EquipInfo, GiftInfo } from "../../api/ApiObjects";

interface Inventory {
    hat: EquipInfo;
    shirt: EquipInfo;
    pants: EquipInfo;
    shoes: EquipInfo;
    weapon: EquipInfo;
    equips: EquipInfo[];
    items: ItemInfo[];
}

export type InventoryState = Inventory & {
    gifts: GiftInfo[];
};

export const SET_INVENTORY = "SET_INVENTORY";
export type SetInventoryAction = Inventory & {
    type: typeof SET_INVENTORY;
}

export const SET_EQUIP_INFO = "SET_EQUIP_INFO";
export type SetEquipInfoAction = {
    type: typeof SET_EQUIP_INFO;
    info: EquipInfo
}

export const REMOVE_EQUIP = "REMOVE_EQUIP";
export type RemoveEquipAction = {
    type: typeof REMOVE_EQUIP;
    id: number;
}

export const EQUIP_ITEM = "EQUIP_ITEM";
export type EquipItemAction = {
    type: typeof EQUIP_ITEM;
    item: EquipInfo;
}

export const CHANGE_ITEM_AMOUNT = "CHANGE_ITEM_AMOUNT";
export type ChangeItemAmountAction = {
    type: typeof CHANGE_ITEM_AMOUNT;
    item: ItemInfo;
    newAmount: number;
}

export const SET_GIFTS = "SET_GIFTS";
export type SetGiftsAction = {
    type: typeof SET_GIFTS;
    gifts: GiftInfo[];
}

export type InventoryAction = SetInventoryAction |
    SetEquipInfoAction |
    RemoveEquipAction |
    EquipItemAction |
    ChangeItemAmountAction |
    SetGiftsAction;