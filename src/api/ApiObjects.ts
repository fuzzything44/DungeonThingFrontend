/* This is an automatically generated file. If you want to make changes, message fuzzything44 directly. */
import { makeCall } from "./makeCall";

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
export interface UpdateInformation {
    gain: number
    total: number
    per_min: number
    tickets: number
    rewards: BossReward[]
}

export interface BuyItemParams {
    id: number;
}
export interface BuyItemResponse {
    mana: number
}
export function callBuyItem(params: BuyItemParams): Promise<BuyItemResponse> {
    return makeCall<BuyItemResponse>({...params, api: "buy"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface ChallengeBossParams {
    auto?: boolean;
}
export interface ChallengeBossResponse {
    result: string;
    log: BossLog[];
    floor?: number
}
export function callChallengeBoss(params: ChallengeBossParams): Promise<ChallengeBossResponse> {
    return makeCall<ChallengeBossResponse>({...params, api: "challenge"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface ChangePasswordParams {
    new_password: string;
    old_password: string;
}
export interface ChangePasswordResponse {
    
}
export function callChangePassword(params: ChangePasswordParams): Promise<ChangePasswordResponse> {
    return makeCall<ChangePasswordResponse>({...params, api: "change_password"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface ClaimGiftParams {
    id: number;
}
export interface ClaimGiftResponse {
    
}
export function callClaimGift(params: ClaimGiftParams): Promise<ClaimGiftResponse> {
    return makeCall<ClaimGiftResponse>({...params, api: "claim_gift"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface CreateAccountParams {
    email?: string;
    password: string;
    character_name: string;
}
export interface CreateAccountResponse {
    auth_token: string;
    id: number
}
export function callCreateAccount(params: CreateAccountParams): Promise<CreateAccountResponse> {
    return makeCall<CreateAccountResponse>({...params, api: "create_account"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface DestroyParams {
    id: number;
}
export interface DestroyResponse {
    
}
export function callDestroy(params: DestroyParams): Promise<DestroyResponse> {
    return makeCall<DestroyResponse>({...params, api: "destroy"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface EnterDungeonParams {
    dungeon: number;
}
export interface EnterDungeonResponse {
    
}
export function callEnterDungeon(params: EnterDungeonParams): Promise<EnterDungeonResponse> {
    return makeCall<EnterDungeonResponse>({...params, api: "enter"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface EquipInfoParams {
    id: number;
}
export interface EquipInfoResponse {
    id: number;
    level: number;
    max_level: number;
    rank: string;
    rankId: number;
    type: number;
    name: string;
    strength: number;
    level_cost: number;
    rank_cost: number;
    reinforce: number
}
export function callEquipInfo(params: EquipInfoParams): Promise<EquipInfoResponse> {
    return makeCall<EquipInfoResponse>({...params, api: "equip_info"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface EquipItemParams {
    id: number;
}
export interface EquipItemResponse {
    
}
export function callEquipItem(params: EquipItemParams): Promise<EquipItemResponse> {
    return makeCall<EquipItemResponse>({...params, api: "use_equip"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface ExitDungeonParams {
    
}
export interface ExitDungeonResponse {
    
}
export function callExitDungeon(params: ExitDungeonParams): Promise<ExitDungeonResponse> {
    return makeCall<ExitDungeonResponse>({...params, api: "exit"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface GetAttributesParams {
    
}
export interface GetAttributesResponse {
    crit_rate: AttributeInfo;
    crit_dmg: AttributeInfo;
    attack_dmg: AttributeInfo
}
export function callGetAttributes(params: GetAttributesParams): Promise<GetAttributesResponse> {
    return makeCall<GetAttributesResponse>({...params, api: "get_attributes"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface GetGiftsParams {
    
}
export interface GetGiftsResponse {
    gifts: GiftInfo
}
export function callGetGifts(params: GetGiftsParams): Promise<GetGiftsResponse> {
    return makeCall<GetGiftsResponse>({...params, api: "gifts"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface GetInventoryParams {
    
}
export interface GetInventoryResponse {
    equips: BasicEquipInfo[];
    weapon: number;
    hat: number;
    shirt: number;
    pants: number;
    shoes: number;
    items: ItemInfo[]
}
export function callGetInventory(params: GetInventoryParams): Promise<GetInventoryResponse> {
    return makeCall<GetInventoryResponse>({...params, api: "inventory"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface GetMarketItemsParams {
    get_mine: boolean;
    item_filter?: number;
    data_filter?: number;
    amount_filter?: number;
    max_price?: number;
    past_id?: number;
}
export interface GetMarketItemsResponse {
    listings: ItemListing[]
}
export function callGetMarketItems(params: GetMarketItemsParams): Promise<GetMarketItemsResponse> {
    return makeCall<GetMarketItemsResponse>({...params, api: "get_market"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface LevelEquipParams {
    id: number;
}
export interface LevelEquipResponse {
    mana: number
}
export function callLevelEquip(params: LevelEquipParams): Promise<LevelEquipResponse> {
    return makeCall<LevelEquipResponse>({...params, api: "level_equip"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface LoginParams {
    name: string;
    password: string;
}
export interface LoginResponse {
    auth_token: string;
    id: number
}
export function callLogin(params: LoginParams): Promise<LoginResponse> {
    return makeCall<LoginResponse>({...params, api: "login"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface RankUpParams {
    id: number;
}
export interface RankUpResponse {
    
}
export function callRankUp(params: RankUpParams): Promise<RankUpResponse> {
    return makeCall<RankUpResponse>({...params, api: "rank"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface ReinforceParams {
    id: number;
    coupon: number;
}
export interface ReinforceResponse {
    success: boolean
}
export function callReinforce(params: ReinforceParams): Promise<ReinforceResponse> {
    return makeCall<ReinforceResponse>({...params, api: "reinforce"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface ReturnSaleItemParams {
    id: number;
}
export interface ReturnSaleItemResponse {
    mana: number
}
export function callReturnSaleItem(params: ReturnSaleItemParams): Promise<ReturnSaleItemResponse> {
    return makeCall<ReturnSaleItemResponse>({...params, api: "return"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface SellItemParams {
    item: number;
    data: number;
    amount: number;
    price: number;
}
export interface SellItemResponse {
    
}
export function callSellItem(params: SellItemParams): Promise<SellItemResponse> {
    return makeCall<SellItemResponse>({...params, api: "sell"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface StatusParams {
    
}
export interface StatusResponse {
    name: string;
    dungeon: number;
    tickets: number;
    floor: number;
    attack: number;
    armor: number;
    crit_rate: number;
    crit_dmg: number;
    max_floor: number
}
export function callStatus(params: StatusParams): Promise<StatusResponse> {
    return makeCall<StatusResponse>({...params, api: "status"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface UpdateParams {
    
}
export interface UpdateResponse {
    result: BossLog[] | UpdateInformation
}
export function callUpdate(params: UpdateParams): Promise<UpdateResponse> {
    return makeCall<UpdateResponse>({...params, api: "update"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface UpgradeAttributeParams {
    name: string;
}
export interface UpgradeAttributeResponse {
    mana: number;
    attr: AttributeInfo
}
export function callUpgradeAttribute(params: UpgradeAttributeParams): Promise<UpgradeAttributeResponse> {
    return makeCall<UpgradeAttributeResponse>({...params, api: "upgrade_attribute"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 