import * as React from "react";
import { border, backgroundSecondary, backgroundColor } from "../styles";

interface TitleContentProps {
    title: JSX.Element;
    style?: React.HTMLAttributes<HTMLDivElement>["style"]
}

const RADIUS = "0.5em";
const TitleContent: React.FC<TitleContentProps> = (props) => {
    return <div
        style={{
            ...border,
            borderRadius: RADIUS,
            ...props.style
        }}
    >
        <div
            style={{
                ...backgroundSecondary,
                borderBottom: border.border,
                width: "calc(100% - 0.6em)",
                padding: "0.3em",
                borderTopLeftRadius: RADIUS,
                borderTopRightRadius: RADIUS
            }}
        >
            {props.title}
        </div>
        <div
            style={{
                ...backgroundColor,
                padding: "0.3em",
                fontWeight: "normal",
                borderBottomLeftRadius: RADIUS,
                borderBottomRightRadius: RADIUS
            }}
        >
            {props.children}
        </div>
    </div>;
};

TitleContent.displayName = "TitleContent";

export { TitleContent };