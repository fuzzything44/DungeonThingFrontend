import * as React from 'react';
import { outlineText } from '../styles';
import { formatNumber } from '../Util/numberFormat';
import { Damage } from '../redux/combat/types';

interface FloatingDamage {
    damage: Damage;
}

const FloatingDamage: React.FC<FloatingDamage> = (props) => {
    if (props.damage.amount === 0) {
        return null;
    }

    return <div
        key={props.damage.startTime}
        style={{
            ...outlineText,
            textAlign: "center",
            fontSize: "large",
            fontWeight: "bold",
            animation: "damage-float 2s linear",
            animationFillMode: "forwards"
        }}
    >- {formatNumber(props.damage.amount)}</div>;
}

FloatingDamage.displayName = "FloatingDamage";

export { FloatingDamage }