import React from 'react';
import { TavernHub } from './tavernHub/TavernHub';
import { Switch, Route } from 'react-router-dom';
import { LOCATIONS } from './locations';
import { Town } from './town/town';

export const LocationManager: React.FC<{}> = () => {
    return <Switch>
        <Route path={LOCATIONS.TAVERN}><TavernHub /></Route>
        <Route path={LOCATIONS.TOWN}><Town /></Route>
        <Route><div>Unknown location </div></Route>
    </Switch>;
}