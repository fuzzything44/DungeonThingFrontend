import * as React from "react";

const ICONS = {
    mana: { image: require("../images/mana.png"), name: "Mana" },
    ticket: { image: require("../images/ticket.png"), name: "Dungeon entry ticket"}
}

interface IconProps {
    icon: keyof typeof ICONS;
}

const Icon: React.FC<IconProps> = (props) => {
    return <img
        src={ICONS[props.icon].image}
        style={{
            height: "1.2em",
            position: "relative",
            top: "0.3em"
        }}
        title={ICONS[props.icon].name}
        alt={ICONS[props.icon].name}
    />;
}

Icon.displayName = "Icon";

export { Icon }