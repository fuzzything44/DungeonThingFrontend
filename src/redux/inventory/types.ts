import { ItemInfo, EquipInfo } from "../../api/ApiObjects";

export interface InventoryState {
    hat: EquipInfo;
    shirt: EquipInfo;
    pants: EquipInfo;
    shoes: EquipInfo;
    weapon: EquipInfo;
    equips: EquipInfo[];
    items: ItemInfo[];
};

export const SET_INVENTORY = "SET_INVENTORY";
export type SetInventoryAction = InventoryState & {
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
export type InventoryAction = SetInventoryAction |
    SetEquipInfoAction |
    RemoveEquipAction |
    EquipItemAction |
    ChangeItemAmountAction;