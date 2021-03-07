import * as React from 'react';
import { Redirect } from 'react-router-dom'

import { TextInput, MAX_TEXTINPUT_WIDTH } from '../Util/TextInput';
import { callLogin, callCreateAccount } from '../api/ApiObjects';
import { backgroundSecondary, border, outlineText } from '../styles';
import { ErrorBox } from '../Util/ErrorBox';
import { PAGES } from '../pages';

interface LoginProps {
    goToCreate: () => void;
}

const Login: React.FC<LoginProps> = (props) => {
    const [showGuest, changeShowGuest] = React.useState(true);
    const [username, changeUsername] = React.useState(localStorage["username"] == null ? "" : localStorage["username"]);
    const [password, changePassword] = React.useState("");
    const [redirect, changeRedirect] = React.useState("");
    const [error, changeError] = React.useState("");
    const handleError = (error: Error) => {
        if (error.message === "Failed to fetch") {
            changeError("Could not connect to the game server. Please try again later.");
        } else {
            changeError(error.message);
        }
    }; 

    if (redirect !== "") {
        return <Redirect to={redirect} />;
    }
    if (showGuest && localStorage["password"]) {
        return <div style={{ textAlign: "center" }}>
            <button
                style={{
                    ...backgroundSecondary,
                    ...border,
                    borderRadius: "0.3em",
                    padding: "0.5em",
                    paddingLeft: "1em",
                    paddingRight: "1em",
                    margin: "0.5em"
                }}
                onClick={() => {
                    callLogin({ name: localStorage["username"], password: localStorage["password"] }).then(data => {
                        changeRedirect(PAGES.WELCOME_BACK);
                    }).catch(error => changeError(error.message));
                }}
            >
                Play on your guest account
            </button>
            <br />
            <button
                onClick={() => { changeUsername(""); changeShowGuest(false); }}
                style={{
                    ...border,
                    borderRadius: "0.3em",
                    padding: "0.5em"
                }}
            >
                Main login
            </button>
        </div>;
    } else {
        const standardWidth = "calc(" + MAX_TEXTINPUT_WIDTH + " - 2px)"
        return <div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ width: MAX_TEXTINPUT_WIDTH }}>
                    <TextInput inputName="Username" inputValue={username} onChange={value => { changeUsername(value); changeError(""); }} example="JaneTheBarbarian" required />
                    <TextInput inputName="Password" inputValue={password} onChange={value => { changePassword(value); changeError(""); }} example="password1" required type="password" />
                    <button
                        onClick={() => {
                            callLogin({ name: username, password: password }).then(data => {
                                if (localStorage["password"] == null) {
                                    localStorage["username"] = username;
                                }
                                changeRedirect(PAGES.WELCOME_BACK);
                            }).catch(handleError);
                        }}
                        style={{
                            ...backgroundSecondary,
                            ...border,
                            marginTop: "0.5em",
                            paddingTop: "0.2em",
                            paddingBottom: "0.2em",
                            borderRadius: "0.3em",
                            width: standardWidth,
                            textAlign: "center"
                        }}
                    >
                        Log in
                    </button>
                </div>
                {/* Super hacky width stuff for mobile display */}
                <div
                    style={{
                        ...outlineText,
                        padding: "1em",
                        width: window.innerWidth < 500 ? "calc(100vw - 2em)" : undefined,
                        textAlign: "center"
                    }}
                >
                    or
                </div>
                <div>
                    <button
                        style={{
                            ...backgroundSecondary,
                            ...border,
                            borderRadius: "0.3em",
                            width: standardWidth,
                            marginTop: "1.5em",
                            marginBottom: "1.5em",
                            textAlign: "center"
                        }}
                        onClick={props.goToCreate}
                    >
                        Create Account
                    </button>
                    <br />
                    <button
                        style={{
                            ...backgroundSecondary,
                            ...border,
                            borderRadius: "0.3em",
                            width: standardWidth,
                            textAlign: "center"
                        }}
                        onClick={() => {
                            if (localStorage["password"]) {
                                callLogin({ name: localStorage["username"], password: localStorage["password"] }).then(_ => {
                                    changeRedirect(PAGES.WELCOME_BACK);
                                }).catch(handleError);
                            } else {
                                let guestName = "temp_" + (Math.round(Math.random() * Number.MAX_SAFE_INTEGER)).toString();
                                let guestPass = (Math.round(Math.random() * Number.MAX_SAFE_INTEGER)).toString();
                                callCreateAccount({ character_name: guestName, password: guestPass }).then(data => {
                                    localStorage["username"] = guestName;
                                    localStorage["password"] = guestPass;
                                    changeRedirect(PAGES.INTRODUCTION);
                                }).catch(handleError);
                            }
                        }}
                    >
                        {localStorage["password"] == null ? "Create Guest Account" : "Play on your guest account"}
                    </button>
                </div>
            </div>
            {error ? <div style={{ textAlign: "center", marginTop: "1em" }}>
                <div style={{ display: "inline-block" }}>
                    <ErrorBox message={error} width={MAX_TEXTINPUT_WIDTH} />
                </div>
            </div> : null}
        </div>
    }
}

Login.displayName = "Login";

export { Login };