import * as React from 'react';
import { Login } from './Login';
import { Create } from './Create';

const LoginCreate: React.FC<{}> = () => {
    let [showLogin, changeShowLogin] = React.useState(true);

    if (showLogin) {
        return <Login goToCreate={() => changeShowLogin(false)} />;
    } else {
        return <Create goToLogin={() => changeShowLogin(true)} />;
    }
}

LoginCreate.displayName = "LoginCreate";

export { LoginCreate };