import * as React from 'react';
import { border, BORDER_COLOR, errorColor, errorBackground } from '../styles';

interface ErrorBoxProps {
    message: string;
    width?: string;
}

const ErrorBox: React.FC<ErrorBoxProps> = (props) => {
    return <div
        style={{
            ...errorBackground,
            border: border.border.replace(BORDER_COLOR, errorColor.color),
            paddingLeft: "1em",
            paddingRight: "1em",
            paddingTop: "0.5em",
            paddingBottom: "0.5em",
            margin: "0.5em",
            width: props.width ? `calc(${props.width} - 2em)` : undefined,
            textAlign: "center"
        }}
    >
        Error: {props.message}
    </div>;
}

ErrorBox.displayName = "ErrorBox";

export { ErrorBox }