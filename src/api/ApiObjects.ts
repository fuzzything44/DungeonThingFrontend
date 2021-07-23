/* This is an automatically generated file. If you want to make changes, message fuzzything44 directly. */
import { makeCall } from "./makeCall";

export interface BossLog {
    time: number;
    damageDealt: number;
    toPlayer: boolean;
    remainingHp: number;
    bossHp: number;
    playerCharge: number;
    details: any;
}
export interface BossRewardEquip {
    type: "EQUIP";
    info: EquipInfo;
}
export interface BossRewardItem {
    type: "ITEM";
    info: ItemInfo;
}
export interface BossRewardSkill {
    type: "SKILL";
    info: SkillInfo;
}
export interface BossRewardMana {
    type: "MANA";
    amount: number;
}
export interface BossReward {
    reward: BossRewardEquip | BossRewardItem | BossRewardSkill | BossRewardMana;
}
export interface AttributeInfo {
    level: number;
    max: number;
    cost: number;
}
export interface GiftInfo {
    id: number;
    characterId: number;
    amount: number;
    itemData: number;
    itemId: number;
}
export interface EquipInfo {
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
    reinforce: number;
}
export interface ItemInfo {
    amount: number;
    characterId: number;
    itemData: number;
    itemId: number;
}
export interface ItemListing {
    amount: number;
    id: number;
    itemData: number;
    itemId: number;
    price: number;
    sellerId: number;
    purchase: string;
}
export interface QuestInfo {
    num: number;
    complete: boolean;
    claimed: boolean;
    name: string;
    desc: string;
}
export interface SkillInfo {
    skill_id: number;
    skill_level: number;
}
export interface UpdateInformation {
    gain: number;
    total: number;
    per_min: number;
    tickets: number;
    rewards: BossReward[];
    time: number;
}
export interface UpdateCombat {
    log: string;
    time_offset: number;
}

export interface BuyItemParams {
    id: number;
}
export interface BuyItemResponse {
    mana: number;
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
 
export interface BuyShopItemParams {
    shop: string;
    entry: string;
    amount?: number;
}
export interface BuyShopItemResponse {
    
}
export function callBuyShopItem(params: BuyShopItemParams): Promise<BuyShopItemResponse> {
    return makeCall<BuyShopItemResponse>({...params, api: "buy_shop"}).then(data => { 
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
    result: boolean;
    log: BossLog[];
    start_hp: number;
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
 
export interface ClaimQuestParams {
    num: number;
}
export interface ClaimQuestResponse {
    
}
export function callClaimQuest(params: ClaimQuestParams): Promise<ClaimQuestResponse> {
    return makeCall<ClaimQuestResponse>({...params, api: "claim_quest"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface CombineItemParams {
    item_id: number;
    new_rank: number;
    amount: number;
}
export interface CombineItemResponse {
    items: ItemInfo[];
}
export function callCombineItem(params: CombineItemParams): Promise<CombineItemResponse> {
    return makeCall<CombineItemResponse>({...params, api: "combine_item"}).then(data => { 
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
    id: number;
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
    info: EquipInfo;
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
 
export interface UseItemParams {
    id: number;
    data: number;
    option?: string;
}
export interface UseItemResponse {
    message: string;
}
export function callUseItem(params: UseItemParams): Promise<UseItemResponse> {
    return makeCall<UseItemResponse>({...params, api: "use_item"}).then(data => { 
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
    attack_dmg: AttributeInfo;
    skill_slots: AttributeInfo;
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
 
export interface GetQuestsParams {
    
}
export interface GetQuestsResponse {
    quests: QuestInfo[];
    refreshDays: number;
}
export function callGetQuests(params: GetQuestsParams): Promise<GetQuestsResponse> {
    return makeCall<GetQuestsResponse>({...params, api: "get_quests"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface GetAssignedSkillsParams {
    
}
export interface GetAssignedSkillsResponse {
    skills: SkillInfo[];
}
export function callGetAssignedSkills(params: GetAssignedSkillsParams): Promise<GetAssignedSkillsResponse> {
    return makeCall<GetAssignedSkillsResponse>({...params, api: "get_assigned_skills"}).then(data => { 
        if ("error" in data) {
            throw new Error(data["error"]);
        } else { 
            return data; 
        } 
    });
}
 
export interface GetSkillsParams {
    
}
export interface GetSkillsResponse {
    skills: SkillInfo[];
}
export function callGetSkills(params: GetSkillsParams): Promise<GetSkillsResponse> {
    return makeCall<GetSkillsResponse>({...params, api: "get_skills"}).then(data => { 
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
    gifts: GiftInfo;
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
    equips: EquipInfo[];
    weapon: EquipInfo;
    hat: EquipInfo;
    shirt: EquipInfo;
    pants: EquipInfo;
    shoes: EquipInfo;
    items: ItemInfo[];
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
    listings: ItemListing[];
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
    mana: number;
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
    id: number;
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
    success: boolean;
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
    mana: number;
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
 
export interface SetAssignedSkillsParams {
    skills: number[];
}
export interface SetAssignedSkillsResponse {
    
}
export function callSetAssignedSkills(params: SetAssignedSkillsParams): Promise<SetAssignedSkillsResponse> {
    return makeCall<SetAssignedSkillsResponse>({...params, api: "set_assigned_skills"}).then(data => { 
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
    hp: number;
    crit_rate: number;
    crit_dmg: number;
    max_floor: number;
    gold: number;
    skill_slots: number;
    element: number;
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
    result: UpdateCombat | UpdateInformation;
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
    attr: AttributeInfo;
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
 