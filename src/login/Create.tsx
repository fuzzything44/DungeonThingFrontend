import * as React from 'react';
import { TextInput, MAX_TEXTINPUT_WIDTH } from '../Util/TextInput';
import { border, backgroundSecondary, backgroundColor } from '../styles';
import { callCreateAccount } from '../api/ApiObjects';
import { ErrorBox } from '../Util/ErrorBox';
import { Redirect } from 'react-router-dom';
import { PAGES } from '../pages';

interface CreateProps {
    goToLogin: () => void
}

const Create: React.FC<CreateProps> = (props) => {
    const [username, changeUsername] = React.useState("");
    const [password, changePassword] = React.useState("");
    const [email, changeEmail] = React.useState("");
    const [error, changeError] = React.useState("");
    const [redirect, changeRedirect] = React.useState("");
    const handleError = (error: Error) => {
        if (error.message === "Failed to fetch") {
            changeError("Could not connect to the game server. Please try again later.");
        } else {
            changeError(error.message);
        }
    }; 

    if (redirect) {
        return <Redirect to={redirect} />
    }

    return <div style={{ textAlign: "center" }}>
        <div>Create an account</div>
        <br/>
        <div style={{display: "inline-block"}}>
            <TextInput inputName="Username" onChange={value => { changeUsername(value); changeError(""); }} inputValue={username} example="VixnarTheMage" required />
            <TextInput inputName="Password" onChange={value => { changePassword(value); changeError(""); }} inputValue={password} example="password123" required type="password" />
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
                }).catch(handleError);
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