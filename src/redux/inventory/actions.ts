import { SetInventoryAction, SET_INVENTORY, SetEquipInfoAction, SET_EQUIP_INFO, RemoveEquipAction, REMOVE_EQUIP, EquipItemAction, EQUIP_ITEM, ChangeItemAmountAction, CHANGE_ITEM_AMOUNT, SetGiftsAction, SET_GIFTS } from "./types";
import { GetInventoryResponse, EquipInfo, ItemInfo, GiftInfo } from "../../api/ApiObjects";
import { store } from "../store";

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

export function setGifts(gifts: GiftInfo[]): SetGiftsAction {
    return {
        type: SET_GIFTS,
        gifts: gifts
    }
}

export function removeGift(id: number): SetGiftsAction {
    return {
        type: SET_GIFTS,
        gifts: store.getState().inventory.gifts.filter(gift => gift.id !== id)
    }
}