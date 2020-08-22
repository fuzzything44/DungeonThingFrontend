import * as React from 'react';
import { HP } from '../redux/combat/types';
import { border, backgroundColor } from '../styles';
import { formatNumber } from '../Util/numberFormat';

interface HealthBarProps {
    hp: HP
}
const HealthBar: React.FC<HealthBarProps> = (props) => {
    return <div style={{
        ...border,
        ...backgroundColor,
        borderRadius: "0.2em",
        position: "relative",
        height: "1em"
    }}>
        <div
        style={{
                position: "absolute",
                backgroundColor: "red",
                borderRight: border.border,
                height: "1em",
                width: (100 * props.hp.current / props.hp.max).toString() + "%",
                marginBottom: "1em"
            }}
        />
        <div style={{ position: "absolute", fontSize: "small", left: "0.2em" }}>HP:</div>
        <div style={{ position: "absolute", fontSize: "small", right: "0.2em" }}>
            {formatNumber(props.hp.current)} / {formatNumber(props.hp.max)}
        </div>
        
    </div>;
}

HealthBar.displayName = "HealthBar";

export { HealthBar }