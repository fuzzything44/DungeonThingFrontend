import { SetInventoryAction, SET_INVENTORY, SetEquipInfoAction, SET_EQUIP_INFO, RemoveEquipAction, REMOVE_EQUIP, EquipItemAction, EQUIP_ITEM, ChangeItemAmountAction, CHANGE_ITEM_AMOUNT } from "./types";
import { GetInventoryResponse, EquipInfo, ItemInfo } from "../../api/ApiObjects";

export function setInventory(response: GetInventoryResponse): SetInventoryAction {
    return {
        type: SET_INVENTORY,
        hat: response.hat,
        shirt: response.shirt,
        pants: response.pants,
        shoes: response.shoes,
        weapon: response.weapon,
        equips: response.equips,
        items: response.items
    };
}

export function setEquipInfo(newInfo: EquipInfo): SetEquipInfoAction {
    return {
        type: SET_EQUIP_INFO,
        info: newInfo
    }
}

export function removeEquip(id: number): RemoveEquipAction {
    return {
        type: REMOVE_EQUIP,
        id: id
    }
}

export function equipItem(item: EquipInfo): EquipItemAction {
    return {
        type: EQUIP_ITEM,
        item: item
    }
}

export function changeItemAmount(item: ItemInfo, amount: number): ChangeItemAmountAction {
    return {
        type: CHANGE_ITEM_AMOUNT,
        item: item,
        newAmount: amount
    }
}