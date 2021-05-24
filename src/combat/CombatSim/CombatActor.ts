import { CombatSkill } from "../../character/Skills/CombatSkills/CombatSkill";
import { BossLog } from "../../api/ApiObjects";
import { ATTACKS_PER_MIN } from "../combatRunner";
import { getSkillData } from "../../character/Skills/SkillData";
import { PlayerState } from "../../redux/player/types";
import { Effect } from "./Effects/Effect";
import { Stats } from "./Effects/StatModifier";

export interface CombatActorInfo {
    damagePerHit: number;
    critMult: number;
    attackSpeed: number;
    critRate: number;
    hp: number;
    toNextAttack: number;
    skillCharge: number;
    skills: CombatSkill[];
    effects: Effect[];
}

const DAMAGE_FUZZING = 0.5;

export class CombatActor {
    info: CombatActorInfo;

    public constructor(info: CombatActorInfo) {
        this.info = info;
    }

    private sumStatModifiers(type: Stats): number {
        return this.info.effects.reduce((accumulator: number, effect: Effect) => {
            return accumulator + effect.modifiers.reduce((acc, mod) => acc + mod.stat === type ? mod.amount : 0, 0);
        }, 0);
    }

    public get totalDamage(): number {
        return (this.info.damagePerHit + this.sumStatModifiers(Stats.DAMAGE_BASE)) *
               (1 + this.sumStatModifiers(Stats.DAMAGE_PERCENT) / 100.0);
    }

    public get totalCritRate(): number {
        return (this.info.critRate + this.sumStatModifiers(Stats.CRIT_RATE));
    }

    public performBasicAttack(enemy: CombatActor): BossLog {
        let damageDealt: number;
        let details: any = {};
        if (Math.random() * 100 < this.totalCritRate) {
            damageDealt = this.info.critMult * this.totalDamage;
            details["message"] = "Critical Hit!";
        }
        else {
            damageDealt = this.totalDamage;
        }
        damageDealt = damageDealt * (1.0 - DAMAGE_FUZZING + Math.random() * DAMAGE_FUZZING * 2);

        enemy.info.hp -= damageDealt;
        const timeSpent = this.info.toNextAttack;
        this.info.toNextAttack += this.info.attackSpeed;
        return {
            time: timeSpent,
            damageDealt: Math.round(damageDealt),
            toPlayer: true,
            remainingHp: 0,
            bossHp: 0,
            details: details,
            playerCharge: 0
        };
    }

    public runAction(enemy: CombatActor): BossLog {
        if (this.info.skills.length > 0 && this.info.skills[0].chargeTime <= this.info.skillCharge) {
            this.info.skillCharge = 0;
            let toUse: CombatSkill = this.info.skills.shift() as CombatSkill;
            toUse.uses--;
            if (toUse.uses > 0) {
                this.info.skills.push(toUse);
            }
            let result = toUse.useSkill(this, enemy);
            result.details["skill"] = toUse.id;
            return result;
        } else {
            this.info.skillCharge++;
            return this.performBasicAttack(enemy);
        }
    }
}

export class PlayerCombatActor extends CombatActor {
    constructor(player: PlayerState) {
        const attackSpeed = 60 * 1000 / ATTACKS_PER_MIN;
        super({
            damagePerHit: player.attack / ATTACKS_PER_MIN,
            critMult: player.crit_dmg,
            attackSpeed: attackSpeed,
            critRate: player.crit_rate,
            hp: player.hp,
            toNextAttack: attackSpeed / 2,
            skillCharge: 0,
            skills: player.usedSkills.filter(sk => sk.skill_id !== 0).map(sk => getSkillData(sk.skill_id, sk.skill_level).skill),
            effects: []
        });
    }

    public runAction(enemy: CombatActor): BossLog {
        let logElem = super.runAction(enemy);
        logElem.toPlayer = false;
        return logElem;
    }
}