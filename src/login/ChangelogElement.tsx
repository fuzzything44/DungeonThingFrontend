import * as React from 'react';
import { border, backgroundColorSecondary } from '../styles';

interface ChangelogElementProps {
    changeDate: string;
    changeItems: string[];
}

export const RADIUS = "0.5em";

const ChangelogElement: React.FC<ChangelogElementProps> = (props) => {
    return <div
        style={{
            ...border,
            borderRadius: RADIUS,
            margin: "0.5em"
        }}
    >
        <h1
            style={{
                ...backgroundColorSecondary,
                borderBottom: border.border,
                width: "calc(100% - 0.6em)",
                padding: "0.3em",
                borderTopLeftRadius: RADIUS,
                borderTopRightRadius: RADIUS
            }}
        >
            {props.changeDate}
        </h1>
        <div style={{ padding: "0.3em" }}>
            {props.changeItems.map(item => <div key={item}>- {item}</div>)}
        </div>
    </div>;
}

ChangelogElement.displayName = "ChangelogElement";

export { ChangelogElement };