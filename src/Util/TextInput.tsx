import * as React from 'react';
import { border, backgroundColor, errorColor, outlineText } from '../styles';

interface TextInputProps {
    inputName: string;
    inputValue: string;
    onChange: (newVal: string) => void;
    required?: boolean;
    example?: string;
    autocomplete?: "username" | "current-password" | "new-password"
}

export const MAX_TEXTINPUT_WIDTH = "15em";
const TextInput: React.FC<TextInputProps> = (props) => {
    let inputId: string = props.inputName.replace(/\s/g, "-");
    return <div style={{ textAlign: "left", width: MAX_TEXTINPUT_WIDTH, paddingBottom: "0.4em" }}>
        <label htmlFor={inputId} style={{ fontSize: "small" }}>
            <span>{props.inputName}</span>
            {props.required ? <span style={{ ...errorColor, ...outlineText, fontWeight: "bold", fontSize: "small", float: "right" }}>(Required)</span> : null}
        </label>
        <br />
        <div>
            <input
                id={inputId}
                type="text"
                value={props.inputValue}
                placeholder={props.example ? "ex. " + props.example : ""}
                onChange={e => props.onChange(e.target.value)}
                style={{
                    ...border,
                    ...backgroundColor,
                    fontSize: "inherit",
                    padding: "0.2em",
                    width: "calc(" + MAX_TEXTINPUT_WIDTH + " - 2px - 0.4em)"
                }}
                autoComplete={props.autocomplete}
            />
        </div>
    </div>;
}

TextInput.displayName = "TextInput";

export { TextInput }