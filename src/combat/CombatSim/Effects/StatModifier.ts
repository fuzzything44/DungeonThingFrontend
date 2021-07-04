
export enum Stats {
    DAMAGE_PERCENT,
    DAMAGE_BASE,
    CRIT_RATE,
    ATTACK_SPEED,
    EFFECT_STACKS // Does nothing, but helps keep track of things
}

export interface StatModifier {
    stat: Stats;
    amount: number;
}