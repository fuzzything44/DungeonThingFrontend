
export enum Stats {
    DAMAGE_PERCENT,
    DAMAGE_BASE,
    CRIT_RATE
}

export interface StatModifier {
    stat: Stats;
    amount: number;
}