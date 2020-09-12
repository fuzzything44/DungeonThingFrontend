import React from 'react';
import "./style.css";
import { LoginPage } from './login/LoginPage';
import { Switch, Route, Redirect, MemoryRouter, Link } from 'react-router-dom'
import { CombatPage } from './combat/CombatPage';
import { WelcomeBackPage } from './welcomeBack/WelcomeBackPage';
import { TavernHub } from './tavernHub/TavernHub';
import { CharacterPage } from './character/CharacterPage';

export const PAGES = {
    LOGIN: "/login",
    INTRODUCTION: "/intro",
    WELCOME_BACK: "/welcomeBack",
    COMBAT: "/combat",
    TAVERN: "/tavern",
    SETTINGS: "/settings",
    CHARACTER: "/character",
    INVENTORY: "/inventory"
};

function App() {
    return (
        <div>
            <MemoryRouter>
                <Switch>
                    <Route exact path="/" ><Redirect to={PAGES.LOGIN} /></Route>
                    <Route path={PAGES.LOGIN}><LoginPage /></Route>
                    <Route path={PAGES.INTRODUCTION}>This is normally the introduction page</Route>
                    <Route path={PAGES.WELCOME_BACK}><WelcomeBackPage /></Route>
                    <Route path={PAGES.COMBAT}><CombatPage /></Route>
                    <Route path={PAGES.TAVERN}><TavernHub /></Route>
                    <Route path={PAGES.SETTINGS}>Settings page. <Link to={PAGES.COMBAT}>Back to combat</Link></Route>
                    <Route path={PAGES.CHARACTER}><CharacterPage /></Route>
                    <Route path={PAGES.INVENTORY}>Inventory page. equips + items here</Route>
                    <Route>404<br/>Page not found</Route>
                </Switch>
            </MemoryRouter>
        </div>
    );
}

export default App;
