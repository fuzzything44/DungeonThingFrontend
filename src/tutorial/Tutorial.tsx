import { connect } from "react-redux";
import { RootState, store } from "../redux/store";
import { Modal } from "../Util/Modal";
import React from "react";
import { NewPlayerTutorial } from "./NewPlayer";
import { setLastTutorial } from "../redux/preferences/actions";
import { buttonStyle } from "../styles";
import { KilledBossTutorial } from "./KilledBoss";
import { BossFiveTutorial } from "./BossFive";
import { HasTicketTutorial } from "./HasTicket";
import { KilledBossAgainTutorial } from "./KilledBossAgain";
import { AutoChallengeTutorial } from "./AutoChallenge";
import { MassDestroyTutorial } from "./MassDestroy";
import { ArmoryTutorial } from "./ArmoryTutorial";
import { SkillTutorial } from "./SkillTutorial";
import { GuildTutorial } from "./GuildTutorial";

interface TutorialPossibilities {
    floor: number;
    tickets: number;
}

export interface Tutorial {
    canShow: (info: TutorialPossibilities) => boolean;
    display: React.FC<{}>;
    name: string;
    id: string;
}

const tutorials: Tutorial[] = [
    NewPlayerTutorial,
    KilledBossTutorial,
    BossFiveTutorial,
    HasTicketTutorial,
    KilledBossAgainTutorial,
    AutoChallengeTutorial,
    MassDestroyTutorial,
    ArmoryTutorial,
    SkillTutorial,
    GuildTutorial
];

interface TutorialProps {
    tutorialInfo: TutorialPossibilities;
    lastTutorialShown: string;
    dungeon: number;
}

const TutorialUnmapped: React.FC<TutorialProps> = (props) => {
    const lastTutorial: number = tutorials.findIndex((tutorial) => tutorial.id === props.lastTutorialShown);
    // They've seen all tutorials, nothing to see here
    if (lastTutorial === tutorials.length - 1 || props.dungeon === 0) {
        return null;
    }
    const nextTutorial: Tutorial = tutorials[lastTutorial + 1];
    const TutorialInfo = nextTutorial.display;
    const finishTutorial = () => {
        store.dispatch(setLastTutorial(nextTutorial.id));
    }
    if (nextTutorial.canShow(props.tutorialInfo)) {
        return <Modal title={nextTutorial.name} onClose={(hitXButton: boolean) => {
            if (hitXButton) {
                finishTutorial();
            }
        }}>
            <TutorialInfo />
            <div style={{ textAlign: "center" }}>
                <button style={buttonStyle} onClick={finishTutorial}>I understand</button>
            </div>
        </Modal>
    } else {
        return null;
    }
}

TutorialUnmapped.displayName = "Tutorial";

const mapStateToProps = (state: RootState): TutorialProps => {
    return {
        lastTutorialShown: state.preferences.lastTutorial,
        dungeon: state.player.dungeon,
        tutorialInfo: {
            floor: state.player.floor,
            tickets: state.player.tickets
        }
    };
}

const TutorialComponent = connect(mapStateToProps)(TutorialUnmapped);
export { TutorialComponent }