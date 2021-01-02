import React from 'react';
import "./style.css";
import { LoginPage } from './login/LoginPage';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import { CombatPage } from './combat/CombatPage';
import { WelcomeBackPage } from './welcomeBack/WelcomeBackPage';
import { TavernHub } from './tavernHub/TavernHub';
import { CharacterPage } from './character/CharacterPage';
import { SettingsPage } from './settings/SettingsPage';
import { InventoryPage } from './inventory/InventoryPage';
import { IntroductionPage } from './introduction/IntroductionPage';
import { IntroductionInsidePage } from './introduction/IntroductionInsidePage';
import { TutorialComponent } from './tutorial/Tutorial';

export const PAGES = {
    LOGIN: "/login",
    INTRODUCTION: "/intro",
    INTRODUCTION_2: "/intro2",
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
            <TutorialComponent />
            <BrowserRouter basename="/TavernCellar">
                <Switch>
                    <Route exact path="/" ><Redirect to={PAGES.LOGIN} /></Route>
                    <Route path={PAGES.LOGIN}><LoginPage /></Route>
                    <Route path={PAGES.INTRODUCTION}><IntroductionPage /></Route>
                    <Route path={PAGES.INTRODUCTION_2}><IntroductionInsidePage /></Route>
                    <Route path={PAGES.WELCOME_BACK}><WelcomeBackPage /></Route>
                    <Route path={PAGES.COMBAT}><CombatPage /></Route>
                    <Route path={PAGES.TAVERN}><TavernHub /></Route>
                    <Route path={PAGES.SETTINGS}><SettingsPage /></Route>
                    <Route path={PAGES.CHARACTER}><CharacterPage /></Route>
                    <Route path={PAGES.INVENTORY}><InventoryPage /></Route>
                    <Route>404<br/>Page not found</Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
