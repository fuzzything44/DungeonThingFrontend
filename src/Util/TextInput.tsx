import * as React from 'react';
import { border, backgroundColor, errorColor } from '../styles';

interface TextInputProps {
    inputName: string;
    inputValue: string;
    onChange: (newVal: string) => void;
    required?: boolean;
    example?: string;
}

export const MAX_TEXTINPUT_WIDTH = "15em";
const TextInput: React.FC<TextInputProps> = (props) => {
    return <div style={{ textAlign: "left", width: MAX_TEXTINPUT_WIDTH, paddingBottom: "0.4em"}}>
        <span style={{ fontSize: "small" }}>{props.inputName}</span>
        {props.required ? <span style={{ ...errorColor, fontSize: "small", float: "right" }}>(Required)</span> : null}
        <br />
        <div>
            <input
                type="text"
                value={props.inputValue}
                placeholder={props.example ? "ex. " + props.example : "" }
                onChange={e => props.onChange(e.target.value)}
                style={{
                    ...border,
                    ...backgroundColor,
                    fontSize: "inherit",
                    padding: "0.2em",
                    width: "calc(" + MAX_TEXTINPUT_WIDTH + " - 2px - 0.4em)"
                }}
            />
        </div>
    </div>;
}

TextInput.displayName = "TextInput";

export { TextInput }