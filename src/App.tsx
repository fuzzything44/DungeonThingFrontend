import React from 'react';
import "./style.css";
import { LoginPage } from './login/LoginPage';
import { Switch, Route, Redirect, MemoryRouter } from 'react-router-dom'
import { backgroundColor } from './styles';

export const PAGES = {
    LOGIN: "/login",
    INTRODUCTION: "/intro",
    COMBAT: "/combat"
};

function App() {
    return (
        <div style={{ ...backgroundColor, padding: "2em", height: "calc(100vh - 4em)" }}>
            <MemoryRouter>
                <Switch>
                    <Route exact path="/" ><Redirect to={PAGES.LOGIN} /></Route>
                    <Route path={PAGES.LOGIN}><LoginPage /></Route>
                    <Route path={PAGES.INTRODUCTION}>This is normally the introduction page</Route>
                    <Route path={PAGES.COMBAT}>This is normally the combat page</Route>

                    <Route>404<br/>Page not found</Route>
                </Switch>
            </MemoryRouter>
        </div>
  );
}

export default App;
