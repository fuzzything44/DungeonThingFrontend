import * as React from 'react';
import { buttonStyle, border } from '../../styles';
import { formatNumber } from '../../Util/numberFormat';
import { GuildBonuses } from '../../api/ApiObjects';
import { Icon } from '../../Util/Icon';
import { ItemDisplay } from '../../inventory/ItemDisplay';
import { ITEM_MAPPINGS } from '../../inventory/itemInfo';


interface GuildBonusProps {
    level: number;
    type: keyof GuildBonuses;
    canUpgrade: boolean;
}

interface BonusDetails {
    name: string;
    effect: string;
    strength: (level: number) => number;
    maxLevel: number;
    upgradeCost: (level: number) => { amount: number, item: React.ReactNode }[];
}

const BONUSES: {[t in keyof GuildBonuses] : BonusDetails} = {
    members: {
        name: "Hallway Size",
        effect: " maximum guild members",
        strength: (level: number) => level,
        maxLevel: 10,
        upgradeCost: (level: number) => [
            [
                { amount: 25000, item: <Icon icon="mana" /> },
                { amount: 50, item: "GP" }
            ],
            [
                { amount: 250000, item: <Icon icon="mana" /> },
                { amount: 100, item: "GP" }
            ],
            [
                { amount: 2.5 * 1000 * 1000, item: <Icon icon="mana" /> },
                { amount: 150, item: "GP" }
            ],
            [
                { amount: 2.5 * 1000 * 1000, item: <Icon icon="mana" /> },
                { amount: 50, item: <Icon icon="gold" /> },
                { amount: 250, item: "GP" }
            ],
            [
                { amount: 2.5 * 1000 * 1000, item: <Icon icon="mana" /> },
                { amount: 100, item: <Icon icon="gold" /> },
                { amount: 250, item: "GP" }
            ],
            [
                { amount: 2.5 * 1000 * 1000, item: <Icon icon="mana" /> },
                { amount: 150, item: <Icon icon="gold" /> },
                { amount: 250, item: "GP" }
            ],
            [
                { amount: 5 * 1000 * 1000, item: <Icon icon="mana" /> },
                { amount: 200, item: <Icon icon="gold" /> },
                { amount: 250, item: "GP" }
            ],
            [
                { amount: 10 * 1000 * 1000, item: <Icon icon="mana" /> },
                { amount: 250, item: <Icon icon="gold" /> },
                { amount: 250, item: "GP" }
            ],
            [
                { amount: 100 * 1000 * 1000, item: <Icon icon="mana" /> },
                { amount: 250, item: <Icon icon="gold" /> },
                { amount: 1000, item: "GP" }
            ],
            [
                { amount: 250 * 1000 * 1000, item: <Icon icon="mana" /> },
                { amount: 250, item: <Icon icon="gold" /> },
                { amount: 1000, item: "GP" }
            ]
        ][level]
    },
    crit_rate: {
        name: "Practice targets",
        effect: "% critical hit rate",
        strength: (level: number) => level / 2,
        maxLevel: 20,
        upgradeCost: (level: number) => [
            { amount: 5, item: <ItemDisplay itemId={ITEM_MAPPINGS.RANK_ORB} itemData={level + 1} amount={5} /> },
            { amount: 25, item: "GP" }
        ]
    },
    crit_dmg: {
        name: "Giant sandbags",
        effect: "% critical damage",
        strength: (level: number) => level,
        maxLevel: 50,
        upgradeCost: (level: number) => [
            { amount: 200 * (level + 1), item: <ItemDisplay itemId={ITEM_MAPPINGS.REINFORCE_COUPON} itemData={1} amount={200 * (level + 1)} /> },
            { amount: 15, item: "GP" }
        ]
    },
    dmg: {
        name: "Whetstones",
        effect: "% damage (applied before AND after raid softcap)",
        strength: (level: number) => level / 4,
        maxLevel: 100,
        upgradeCost: (level: number) => [{ amount: 17, item: "thingy" }]
    },
    skill_slots: {
        name: "Library",
        effect: " skill slots",
        strength: (level: number) => level,
        maxLevel: 1,
        upgradeCost: () => [
            // 1b mana, 10k rank 1 orbs. Enough for a guild to grind a while.
            // TODO: probably reduce this in the future
            { amount: 1 * 1000 * 1000 * 1000, item: <Icon icon="mana" /> },
            { amount: 10000, item: <ItemDisplay itemId={ITEM_MAPPINGS.RANK_ORB} itemData={1} amount={10000} /> },
            { amount: 5000, item: "GP" }
        ]
    },
    cost_reduce: {
        name: "Maintenance Crew",
        effect: "% guild bonus cost reduction",
        strength: (level: number) => level,
        maxLevel: 50,
        upgradeCost: (level: number) => {
            if (level + 1 < 25) {
                return []; // Normal stuff?
            } else {
                return []; // Maybe take a raid drop?
            }
        }
    }
}

export const GuildBonus: React.FC<GuildBonusProps> = (props) => {
    const details = BONUSES[props.type];

    return <details style={{ padding: "0.2em" }}>
        <summary><span style={buttonStyle}>{details.name} ({props.level}/{details.maxLevel})</span></summary>
        <div style={{ ...border, borderRadius: "0.3em", marginTop: "0.2em" }}>
            +{formatNumber(details.strength(props.level))}{details.effect}
            {props.canUpgrade && props.level < details.maxLevel ? <div style={{ paddingLeft: "2em"}}>
                <button style={buttonStyle}>Upgrade</button> for:
                <ul style={{ listStyleType: "none", margin: "0.1em" }}>
                    {details.upgradeCost(props.level).map((cost, i) => <li key={i}>{formatNumber(cost.amount)} {cost.item}</li>)}
                </ul>
            </div> : null}
        </div>
    </details>;
}