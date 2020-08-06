import * as React from 'react';
import { TextInput, MAX_TEXTINPUT_WIDTH } from '../Util/TextInput';
import { border, backgroundSecondary, backgroundColor } from '../styles';
import { callCreateAccount } from '../api/ApiObjects';
import { ErrorBox } from '../Util/ErrorBox';
import { Redirect } from 'react-router-dom';
import { PAGES } from '../App';

interface CreateProps {
    goToLogin: () => void
}

const Create: React.FC<CreateProps> = (props) => {
    let [username, changeUsername] = React.useState("");
    let [password, changePassword] = React.useState("");
    let [email, changeEmail] = React.useState("");
    let [error, changeError] = React.useState("");
    let [redirect, changeRedirect] = React.useState("");

    if (redirect) {
        return <Redirect to={redirect} />
    }

    return <div style={{ textAlign: "center" }}>
        <div>Create an account</div>
        <br/>
        <div style={{display: "inline-block"}}>
            <TextInput inputName="Username" onChange={value => { changeUsername(value); changeError(""); }} inputValue={username} example="VixnarTheMage" required />
            <TextInput inputName="Password" onChange={value => { changePassword(value); changeError(""); }} inputValue={password} example="password123" required />
            <TextInput inputName="Email" onChange={value => { changeEmail(value); changeError(""); }} inputValue={email} example="squidlover@gmail.com" />
        </div>
        <br/>
        <button
            style={{
                ...backgroundSecondary,
                ...border,
                marginTop: "1em",
                borderRadius: "0.2em",
                padding: "0.1em",
                paddingLeft: "0.2em",
                paddingRight: "0.2em"
            }}
            onClick={() => {
                callCreateAccount({ character_name: username, password: password, email: email }).then(data => {
                    if (localStorage["password"] == null) {
                        localStorage["username"] = username;
                    }
                    changeRedirect(PAGES.INTRODUCTION);
                }).catch(error => changeError(error.message));
            }}
        >
            Create Account
        </button>
        <br/>
        <button
            style={{
                ...border,
                ...backgroundColor,
                marginTop: "1em",
                borderRadius: "0.2em",
                padding: "0.1em",
                paddingLeft: "0.2em",
                paddingRight: "0.2em"
            }}
            onClick={props.goToLogin}
        >
            Back to Login
        </button>
        {error ? <div style={{ textAlign: "center", marginTop: "1em" }}>
            <div style={{ display: "inline-block" }}>
                <ErrorBox message={error} width={MAX_TEXTINPUT_WIDTH} />
            </div>
        </div> : null}
    </div>;
}

Create.displayName = "Create";

export { Create };