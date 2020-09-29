import * as React from 'react';
import { UpdateInformation, callStatus, callUpdate, BossLog } from '../api/ApiObjects';
import { Redirect } from 'react-router-dom';
import { PAGES } from '../App';
import { ScrollingBackground } from '../combat/ScrollingBackground';
import { PlayerDisplay } from '../combat/PlayerDisplay';
import { DEFAULT_ACTION_TIME, runCombat, createCombatTimeouts } from '../combat/combatRunner';
import { Modal } from '../Util/Modal';
import { OfflineGains } from './OfflineGains';
import { ErrorBox } from '../Util/ErrorBox';
import { store } from '../redux/store';
import { setPlayerInfo, setMana, setManaRate } from '../redux/player/actions';
import { setChallengeBoss } from '../redux/combat/actions';
import { isLoggedIn } from '../api/makeCall';

interface WelcomeBackProps {
};

const WelcomeBackPage: React.FC<WelcomeBackProps> = (props) => {
    const [redirect, changeRedirect] = React.useState("");
    const [updateResults, changeUpdateResults] = React.useState<UpdateInformation | "UNSET" | "FETCHING">("UNSET");
    const [error, changeError] = React.useState("");

    if (!isLoggedIn()) {
        return <Redirect to={PAGES.LOGIN} />;
    }

    if (updateResults === "UNSET") {
        changeUpdateResults("FETCHING");
        Promise.all([callStatus({}), callUpdate({})]).then((results) => {
            const [status, update] = results;
            
            store.dispatch(setPlayerInfo(status));
            if (status.dungeon === 0) {
                changeRedirect(PAGES.INTRODUCTION);
                return;
            }

            if ("log" in update.result) {
                const log: BossLog[] = JSON.parse(update.result.log);
                // Sure, we're fudging the hp a bit. Whatever.
                store.dispatch(setChallengeBoss());
                createCombatTimeouts(log, log[0].bossHp + (log[0].toPlayer ? 0 : log[0].damageDealt), update.result.time_offset);
                changeRedirect(PAGES.COMBAT);
            } else {
                changeUpdateResults(update.result);
                store.dispatch(setMana(update.result.total));
                store.dispatch(setManaRate(update.result.per_min));
                runCombat();
            }
        }).catch((error) => {
            changeError(error.message);
        });
    }
    if (redirect) {
        return <Redirect to={redirect} />;
    }

    return <div>
        <ScrollingBackground paused={false} image={`url(${require("../images/outside.png")})`} />
        <PlayerDisplay
            walking={true}
            hp={{max: 1, current: 1}}
            damage={[]}
            action={{ type: "NONE", time: DEFAULT_ACTION_TIME, startTime: 0 }}
        />
        <Modal hideClose onClose={() => { }} title="Welcome Back!">
            {error ? <ErrorBox message={error} /> : null}
            {typeof updateResults === "string" ? "Calculating offline gains..." :
                <OfflineGains
                    results={updateResults}
                    closeClicked={() => changeRedirect(PAGES.COMBAT)}
                />
            }
        </Modal>
    </div>;
}

WelcomeBackPage.displayName = "WelcomeBackPage";

export { WelcomeBackPage }