import * as React from 'react';
import { UpdateInformation, callStatus, callUpdate } from '../api/ApiObjects';
import { Redirect } from 'react-router-dom';
import { PAGES } from '../App';
import { ScrollingBackground } from '../combat/ScrollingBackground';
import { PlayerDisplay } from '../combat/PlayerDisplay';
import { DEFAULT_ACTION_TIME, runCombat } from '../combat/combatRunner';
import { Modal } from '../Util/Modal';
import { OfflineGains } from './OfflineGains';
import { ErrorBox } from '../Util/ErrorBox';
import { store } from '../redux/store';
import { setPlayerInfo } from '../redux/player/actions';

interface WelcomeBackProps {
};

const WelcomeBackPage: React.FC<WelcomeBackProps> = (props) => {
    const [redirect, changeRedirect] = React.useState(false);
    const [updateResults, changeUpdateResults] = React.useState<UpdateInformation | "UNSET" | "FETCHING">("UNSET");
    const [error, changeError] = React.useState("");

    if (updateResults === "UNSET") {
        changeUpdateResults("FETCHING");
        Promise.all([callStatus({}), callUpdate({})]).then((results) => {
            const [status, update] = results;
            store.dispatch(setPlayerInfo(status));
            if ("log" in update.result) {
                throw new Error("TODO: Got back bosslog, handle this");
            } else {
                changeUpdateResults(update.result);
                runCombat();
            }
        }).catch((error) => {
            changeError(error.message);
        });
    }
    if (redirect) {
        return <Redirect to={PAGES.COMBAT} />;
    }

    return <div>
        <ScrollingBackground paused={false} image={`url(${require("../images/tavern_repeat.png")})`} />
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
                    closeClicked={() => changeRedirect(true)}
                />
            }
        </Modal>
    </div>;
}

WelcomeBackPage.displayName = "WelcomeBackPage";

export { WelcomeBackPage }