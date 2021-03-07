import React from 'react';
import "./style.css";
import { LoginPage } from './login/LoginPage';
import { Switch, Route, Redirect, MemoryRouter } from 'react-router-dom'
import { CombatPage } from './combat/CombatPage';
import { WelcomeBackPage } from './welcomeBack/WelcomeBackPage';
import { CharacterPage } from './character/CharacterPage';
import { SettingsPage } from './settings/SettingsPage';
import { InventoryPage } from './inventory/InventoryPage';
import { IntroductionPage } from './introduction/IntroductionPage';
import { IntroductionInsidePage } from './introduction/IntroductionInsidePage';
import { TutorialComponent } from './tutorial/Tutorial';
import { LocationManager } from './locations/locationManager';
import { PAGES } from './pages';

function App() {
    return (
        <div>
            <TutorialComponent />
            <MemoryRouter>
                <Switch>
                    <Route exact path="/" ><Redirect to={PAGES.LOGIN} /></Route>
                    <Route path={PAGES.LOGIN}><LoginPage /></Route>
                    <Route path={PAGES.INTRODUCTION}><IntroductionPage /></Route>
                    <Route path={PAGES.INTRODUCTION_2}><IntroductionInsidePage /></Route>
                    <Route path={PAGES.WELCOME_BACK}><WelcomeBackPage /></Route>
                    <Route path={PAGES.COMBAT}><CombatPage /></Route>
                    <Route path={PAGES.LOCATION}><LocationManager /></Route>
                    <Route path={PAGES.SETTINGS}><SettingsPage /></Route>
                    <Route path={PAGES.CHARACTER}><CharacterPage /></Route>
                    <Route path={PAGES.INVENTORY}><InventoryPage /></Route>
                    <Route>404<br/>Page not found</Route>
                </Switch>
            </MemoryRouter>
        </div>
    );
}

export default App;
