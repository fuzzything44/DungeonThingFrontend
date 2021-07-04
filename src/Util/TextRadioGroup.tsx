import * as React from 'react';
import { buttonStyle } from '../styles';

interface Label {
    display: string;
    value: string;
}

interface TextRadioGroupProps {
    labels: Label[];
    selected: string;
    onChange: (newVal: string) => void;
    group: string
}

const TextRadioGroup: React.FC<TextRadioGroupProps> = (props) => {
    const [selected, changeSelected] = React.useState(false);

    return <span style={{ outline: selected ? "1px solid black" : undefined }}>
        {props.labels.map(label => <label
            key={label.value}
            style={{
                ...buttonStyle,
                margin: "0.2em",
                ...(label.value === props.selected ? { backgroundColor: "lightgray" } : {})
            }}
        >
            {label.display}
            <input
                style={{ position: "absolute", left: "-99999px" }}
                type="radio"
                radioGroup={props.group}
                value={label.value}
                checked={props.selected === label.value}
                onChange={() => props.onChange(label.value)}
                onFocus={() => changeSelected(true)}
                onBlur={() => changeSelected(false)}
            />
        </label>)}
    </span>;
}

TextRadioGroup.displayName = "TextRadioGroup";

export { TextRadioGroup }