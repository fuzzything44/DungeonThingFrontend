import * as React from 'react';
import { Modal } from '../Util/Modal';
import { BoxedImage } from '../Util/BoxedImage';
import { equipImages } from '../images/equips';
import { standardBorderColors } from '../inventory/itemInfo';
import { buttonStyle } from '../styles';
import { Icon } from '../Util/Icon';
import { ErrorBox } from '../Util/ErrorBox';
import { callEnterDungeon, callStatus, callUpdate } from '../api/ApiObjects';
import { store } from '../redux/store';
import { setPlayerInfo, setMana, setManaRate } from '../redux/player/actions';
import { runCombat } from '../combat/combatRunner';
import { Redirect } from 'react-router-dom';
import { PAGES } from '../pages';

enum IntroductionStates {
    DIALOG_1,
    DIALOG_2
}

interface IntroductionProps {
};

const IntroductionInsidePage: React.FC<IntroductionProps> = (props) => {
    const [phase, changePhase] = React.useState(IntroductionStates.DIALOG_1);
    const [error, changeError] = React.useState("");
    const [redirect, changeRedirect] = React.useState("");

    if (redirect) {
        return <Redirect to={redirect} />;
    }

    return <div style={{
            height: "100vh",
            width: "max(100vw, 45em)"
        }}>
            <div style={{
                float: "left",
                width: "25em",
                height: "100%",
                backgroundImage: `url(${require("../images/tavern/tavern_left.png")})`,
                backgroundSize: "25em 100%",
            }}>
            </div>
            <div style={{
                float: "left",
                width: "calc(100% - 25em)",
                height: "100%",
                backgroundImage: `url(${require("../images/tavern/tavern_inside_repeat.png")})`,
                backgroundSize: "25em 100%",
                backgroundRepeat: "repeat-x"
            }}>
            </div>
        <img
            style={{
                position: "absolute",
                left: "31em",
                bottom: "63.7vh",
                height: "9em"
            }}
            src={require("../images/tavern/door.png")}
            alt="Some door"
            title="Some door"
        />
        <img
            style={{
                position: "absolute",
                left: "40em",
                top: "calc(36.2vh - 7em)",
                height: "7em"
            }}
            src={require("../images/tavern/barkeeper.png")}
            alt="Barkeeper"
            title="Barkeeper"
        />
        {phase === IntroductionStates.DIALOG_1 ? < Modal title="The Bartender" hideClose onClose={() => null}>
            <p>Hello, traveller! Welcome to my tavern!</p>
            <p>
                I see you have no money pay for a room.
                Perhaps if you could help me out, we could arrange something.
                See, I've been having issues with the cellar of my tavern, through this door behind me.
                If you could go in and investigate, I'll let you have a room.
                But be careful, there's many adventurers like you who have entered and never came back out.
            </p>
            <p>
                Here, I'll help you out.
                Here's a few pieces of broken gear I've found from some of the bodies.
                They're nothing great, but I'm sure you'll be able to get better stuff soon.
            </p>
            <div style={{ textAlign: "center" }}>
                {["Sword", "Hat", "Shirt", "Pants", "Shoes"].map((name, index) => <BoxedImage
                    key={index}
                    image={equipImages[index].broken}
                    title={"Broken " + name}
                    borderColor={standardBorderColors(1)}
                />)}
            </div>
            <div style={{ textAlign: "center" }}>
                <button
                    style={buttonStyle}
                    onClick={() => changePhase(IntroductionStates.DIALOG_2)}
                >
                    Uhh...
                </button>
            </div>
        </Modal> : null}
        {phase === IntroductionStates.DIALOG_2 ? < Modal title="The Bartender" hideClose onClose={() => null}>
            {error ? <ErrorBox message={error} /> : null}
            <p>
                Oh, don't be scared! I'm sure you'll be fine. Probably.
                Anyways, it's not like you have much choice. 
                This is the only place in town to stay, and once you're in town, well...
            </p>
            <p>
                But enough about that. Just go through that door, beat up whatever you find, and report back to me.
                I'll let you go in once a day - after that I've found the survival rate drops significantly.
            </p>
            <p>
                Here's your ticket for today <Icon icon="ticket" />.
            </p>
            <p>
                Good luck!
            </p>
            <div style={{ textAlign: "center" }}>
                <button
                    style={buttonStyle}
                    onClick={async () => {
                        try {
                            callEnterDungeon({ dungeon: 1 });
                            const [status, update] = await Promise.all([
                                callStatus({}),
                                callUpdate({})]);
                            if ("log" in update.result) {
                                changeError("You're fighting a boss while not in a dungeon. Contact fuzzything44.");
                            } else {
                                store.dispatch(setPlayerInfo(status));
                                store.dispatch(setMana(update.result.total));
                                store.dispatch(setManaRate(update.result.per_min));
                                runCombat();
                                changeRedirect(PAGES.COMBAT);
                            }
                        } catch (e) {
                            changeError(e.message);
                        }
                    }}
                >
                    Enter the Cellar
                </button>
            </div>
        </Modal> : null}
    </div>;
}

IntroductionInsidePage.displayName = "IntroductionInsidePage";

export { IntroductionInsidePage }