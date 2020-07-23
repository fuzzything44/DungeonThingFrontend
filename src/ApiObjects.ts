export interface BossLog {
    time: number
    damageDealt: number
    toPlayer: boolean
    remainingHp: number
    bossHp: number
    details: any
}
export interface BossReward {
    
}
export interface AttributeInfo {
    level: number
    max: number
    cost: number
}
export interface GiftInfo {
    id: number
    characterId: number
    amount: number
    itemData: number
    itemId: number
}
export interface BasicEquipInfo {
    level: number
    type: number
    name: number
    id: number
    rankId: number
}
export interface ItemInfo {
    amount: number
    characterId: number
    itemData: number
    itemId: number
}
export interface ItemListing {
    amount: number
    id: number
    itemData: number
    itemId: number
    price: number
    sellerId: number
    purchase: string
}

export interface BuyItemParams {
    api: "buy";
    id: number;
}
export type BuyItemResponse = { error: string } | {
    mana: number
}
 
export interface ChallengeBossParams {
    api: "challenge";
    auto?: boolean;
}
export type ChallengeBossResponse = { error: string } | {
    result: string,
    log: BossLog[],
    floor?: number,
    rewards?: BossReward
}
 
export interface ChangePasswordParams {
    api: "change_password";
    new_password: string;
    old_password: string;
}
export type ChangePasswordResponse = { error: string } | {
    
}
 
export interface ClaimGiftParams {
    api: "claim_gift";
    id: number;
}
export type ClaimGiftResponse = { error: string } | {
    
}
 
export interface CreateAccountParams {
    api: "create_account";
    email?: string;
    password: string;
    character_name: string;
}
export type CreateAccountResponse = { error: string } | {
    auth_token: string,
    id: number
}
 
export interface DestroyParams {
    api: "destroy";
    id: number;
}
export type DestroyResponse = { error: string } | {
    
}
 
export interface EnterDungeonParams {
    api: "enter";
    dungeon: number;
}
export type EnterDungeonResponse = { error: string } | {
    
}
 
export interface EquipInfoParams {
    api: "equip_info";
    id: number;
}
export type EquipInfoResponse = { error: string } | {
    id: number,
    level: number,
    max_level: number,
    rank: string,
    rankId: number,
    type: number,
    name: string,
    strength: number,
    level_cost: number,
    rank_cost: number,
    reinforce: number
}
 
export interface EquipItemParams {
    api: "use_equip";
    id: number;
}
export type EquipItemResponse = { error: string } | {
    
}
 
export interface ExitDungeonParams {
    api: "exit";
    
}
export type ExitDungeonResponse = { error: string } | {
    
}
 
export interface GetAttributesParams {
    api: "get_attributes";
    
}
export type GetAttributesResponse = { error: string } | {
    crit_rate: AttributeInfo,
    crit_dmg: AttributeInfo,
    attack_dmg: AttributeInfo
}
 
export interface GetGiftsParams {
    api: "gifts";
    
}
export type GetGiftsResponse = { error: string } | {
    gifts: GiftInfo
}
 
export interface GetInventoryParams {
    api: "inventory";
    
}
export type GetInventoryResponse = { error: string } | {
    equips: BasicEquipInfo[],
    weapon: number,
    hat: number,
    shirt: number,
    pants: number,
    shoes: number,
    items: ItemInfo[]
}
 
export interface GetMarketItemsParams {
    api: "get_market";
    get_mine: boolean;
    item_filter?: number;
    data_filter?: number;
    amount_filter?: number;
    max_price?: number;
    past_id?: number;
}
export type GetMarketItemsResponse = { error: string } | {
    listings: ItemListing[]
}
 
export interface LevelEquipParams {
    api: "level_equip";
    id: number;
}
export type LevelEquipResponse = { error: string } | {
    mana: number
}
 
export interface LoginParams {
    api: "login";
    name: string;
    password: string;
}
export type LoginResponse = { error: string } | {
    auth_token: string,
    id: number
}
 
export interface RankUpParams {
    api: "rank";
    id: number;
}
export type RankUpResponse = { error: string } | {
    
}
 
export interface ReinforceParams {
    api: "reinforce";
    id: number;
    coupon: number;
}
export type ReinforceResponse = { error: string } | {
    success: boolean
}
 
export interface ReturnSaleItemParams {
    api: "return";
    id: number;
}
export type ReturnSaleItemResponse = { error: string } | {
    mana: number
}
 
export interface SellItemParams {
    api: "sell";
    item: number;
    data: number;
    amount: number;
    price: number;
}
export type SellItemResponse = { error: string } | {
    
}
 
export interface StatusParams {
    api: "status";
    
}
export type StatusResponse = { error: string } | {
    name: string,
    dungeon: number,
    tickets: number,
    floor: number,
    attack: number,
    armor: number,
    crit_rate: number,
    crit_dmg: number,
    max_floor: number
}
 
export interface UpdateParams {
    api: "update";
    
}
export type UpdateResponse = { error: string } | {
    gain: number,
    total: number,
    per_min: number,
    tickets: number
}
 
export interface UpgradeAttributeParams {
    api: "upgrade_attribute";
    name: string;
}
export type UpgradeAttributeResponse = { error: string } | {
    mana: number,
    attr: AttributeInfo
}
 