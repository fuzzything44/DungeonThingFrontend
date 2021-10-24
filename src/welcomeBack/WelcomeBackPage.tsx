import * as React from 'react';
import { UpdateInformation, callStatus, callUpdate, BossLog, callGetAssignedSkills, callGetGifts } from '../api/ApiObjects';
import { Redirect } from 'react-router-dom';
import { PAGES } from '../pages';
import { ScrollingBackground } from '../combat/ScrollingBackground';
import { PlayerDisplay } from '../combat/PlayerDisplay';
import { DEFAULT_ACTION_TIME, runCombat, createCombatTimeouts } from '../combat/combatRunner';
import { Modal } from '../Util/Modal';
import { OfflineGains } from './OfflineGains';
import { ErrorBox } from '../Util/ErrorBox';
import { store } from '../redux/store';
import { setPlayerInfo, setMana, setManaRate, setUsedSkills } from '../redux/player/actions';
import { setChallengeBoss } from '../redux/combat/actions';
import { setGifts } from '../redux/inventory/actions';

interface WelcomeBackProps {
};

const WelcomeBackPage: React.FC<WelcomeBackProps> = (props) => {
    const [redirect, changeRedirect] = React.useState("");
    const [updateResults, changeUpdateResults] = React.useState<UpdateInformation | "UNSET" | "FETCHING">("UNSET");
    const [error, changeError] = React.useState("");

    if (updateResults === "UNSET") {
        changeUpdateResults("FETCHING");
        Promise.all([callStatus({}), callUpdate({}).catch(), callGetAssignedSkills({})]).then((results) => {
            const [status, update, skills] = results;
            
            store.dispatch(setPlayerInfo(status));
            store.dispatch(setUsedSkills(skills.skills));

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

            callGetGifts({}).then(result => {
                store.dispatch(setGifts(result.gifts));
            });
        }).catch((error) => {
            if (error.message === "You're not in a dungeon") {
                changeRedirect(PAGES.INTRODUCTION);
                return;
            }
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
            action={{ type: "NONE", time: DEFAULT_ACTION_TIME, startTime: 0, skillCharge: 0 }}
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