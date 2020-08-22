import React from 'react';
import "./style.css";
import { LoginPage } from './login/LoginPage';
import { Switch, Route, Redirect, MemoryRouter } from 'react-router-dom'
import { CombatPage } from './combat/CombatPage';

export const PAGES = {
    LOGIN: "/login",
    INTRODUCTION: "/intro",
    COMBAT: "/combat"
};

function App() {
    return (
        <div>
            <MemoryRouter>
                <Switch>
                    <Route exact path="/" ><Redirect to={PAGES.COMBAT} /></Route>
                    <Route path={PAGES.LOGIN}><LoginPage /></Route>
                    <Route path={PAGES.INTRODUCTION}>This is normally the introduction page</Route>
                    <Route path={PAGES.COMBAT}><CombatPage /></Route>

                    <Route>404<br/>Page not found</Route>
                </Switch>
            </MemoryRouter>
        </div>
  );
}

export default App;
