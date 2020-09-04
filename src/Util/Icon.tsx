import * as React from "react";

interface IconProps {
    image: string;
    name: string;
}

const Icon: React.FC<IconProps> = (props) => {
    return <img
        src={props.image}
        style={{
            height: "1.2em",
            position: "relative",
            top: "0.3em"
        }}
        title={props.name}
        alt={props.name}
    />;
}

Icon.displayName = "Icon";

export { Icon }