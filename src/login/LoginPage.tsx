import * as React from 'react';
import { Changelog } from './Changelog';
import { LoginCreate } from './LoginCreate';
import { outlineText, backgroundColor, border } from '../styles';

const LoginPage: React.FC = () => {
    return <div style={{
        backgroundImage: `url(${require("../images/login.png")})`,
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundSize: "10em",
        imageRendering: "pixelated"
    }}> 
        <div
            style={{
                ...outlineText,
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "x-large",
                padding: "2em",
                height: "5em"
            }}
        >
            Welcome to DungeonThing (name WIP)
        </div><br />
        <form
            style={{
                ...backgroundColor,
                ...border,
                borderRadius: "0.5em",
                display: "inline-block",
                padding: "2em",
                position: "relative",
                left: "50%",
                top: "5em",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)"
            }}
            onSubmit={(e) => e.preventDefault()}
        >
            <LoginCreate />
        </form>
        <div style={{ height: "2em" }} />
        <div style={{ height: "1em" }} />
        <Changelog />
    </div>;
}

LoginPage.displayName = "LoginPage";

export { LoginPage };
