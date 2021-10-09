import React from 'react';
import { TavernHub } from './tavernHub/TavernHub';
import { Switch, Route } from 'react-router-dom';
import { LOCATIONS } from './locations';
import { Town } from './town/town';
import { Forge } from './forge/Forge';
import { GuildHall } from './guild/GuildHall';

export const LocationManager: React.FC<{}> = () => {
    return <Switch>
        <Route path={LOCATIONS.TAVERN}><TavernHub /></Route>
        <Route path={LOCATIONS.TOWN}><Town /></Route>
        <Route path={LOCATIONS.FORGE}><Forge /></Route>
        <Route path={LOCATIONS.GUILD}><GuildHall /></Route>
        <Route><div>Unknown location </div></Route>
    </Switch>;
}