import * as React from 'react';
import { border, backgroundColor } from '../styles';

interface UpgradeButtonProps {
    selected: boolean;
    image: string;
    text: string;
    onClick: () => void;
}

const UpgradeButton: React.FC<UpgradeButtonProps> = (props) => {
    return <button
        style={{
            border: props.selected ? "2px solid red" : border.border,
            boxSizing: "border-box",
            width: "5em",
            height: "5em",
            backgroundImage: `url(${props.image})`,
            backgroundSize: "5em 5em",
            textAlign: "center",
            verticalAlign: "text-bottom",
            position: "relative",
            display: "block"
        }}
        disabled={props.selected}
        onClick={props.onClick}
    >
        <div style={{
            ...backgroundColor,
            position: "absolute",
            bottom: "0",
            left: "2px",
            width: "calc(5em - 8px)"
        }}>
            {props.text}
        </div>
    </button>
}

UpgradeButton.displayName = "UpgradeButton";

export { UpgradeButton }