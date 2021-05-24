import * as React from "react";

import { TitleContent } from "../Util/TitleContent";
import { TextInput } from "../Util/TextInput";
import { ErrorBox } from "../Util/ErrorBox";
import { buttonStyle } from "../styles";
import { callChangePassword } from "../api/ApiObjects";


export const ChangePassword: React.FC<{}> = () => {
    const [oldPass, changeOldPass] = React.useState("");
    const [newPass, changeNewPass] = React.useState("");
    const [error, changeError] = React.useState("");
    const [success, changeSuccess] = React.useState(false);

    if (success) {
        return <TitleContent
            style={{ textAlign: "center" }}
            title={<h2>Change Password</h2>}
        >
            <div style={{ height: "11em"}}>
                Password changed successfully!<br />
                <button
                    style={{ ...buttonStyle, margin: "1em" }}
                    onClick={() => {
                        changeSuccess(false);
                        changeOldPass("");
                        changeNewPass("");
                        changeError("");
                    }}
                >
                        Change Password Again
                </button>
            </div>
        </TitleContent>
    }
    return <TitleContent
        style={{ textAlign: "center" }}
        title={<h2>Change Password</h2>}
    >
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1em" }}>
            <TextInput
                inputName="Old Password"
                inputValue={oldPass}
                type="password"
                required
                onChange={(newInput) => { changeOldPass(newInput); changeError(""); }}
            />
            <div style={{ width: "2em" }} />
            <TextInput
                inputName="New Password"
                inputValue={newPass}
                type="password"
                required
                onChange={(newInput) => { changeNewPass(newInput); changeError(""); }}
            />
        </div>
        <button
            style={{ ...buttonStyle, margin: "1em" }}
            onClick={async () => {
                try {
                    await callChangePassword({ old_password: oldPass, new_password: newPass });
                    changeSuccess(true);
                    changeError("");
                } catch (e) {
                    changeError(e.message);
                }
            }}
        >
            Change Password
        </button>
        {error ? <ErrorBox message={error} /> : null}
        <p>Passwords must be less than 128 characters. </p>
    </TitleContent>;
};