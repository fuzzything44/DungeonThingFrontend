import * as React from 'react';
import { Changelog } from './Changelog';
import { LoginCreate } from './LoginCreate';

const LoginPage: React.FC = () => {
    return <div> 
        <div
            style={{
                textAlign: "center",
                fontSize: "x-large",
                fontWeight: "bold"
            }}
        >
            Welcome to DungeonThing (name WIP)
        </div><br />
        <LoginCreate />
        <div style={{ height: "2em" }} />
        <hr style={{ maxWidth: "25em" }} />
        <div style={{ height: "1em" }} />

        <Changelog />
    </div>;
}

LoginPage.displayName = "LoginPage";

export { LoginPage };
