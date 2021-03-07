import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { ScrollingBackground } from '../combat/ScrollingBackground';
import { DEFAULT_ACTION_TIME } from '../combat/combatRunner';
import { PlayerGif, PlayerActions } from '../Util/PlayerGif';
import { Modal } from '../Util/Modal';
import { buttonStyle } from '../styles';
import { PAGES } from '../pages';
import { isLoggedIn } from '../api/makeCall';


enum IntroductionStates {
    WALKING,
    TAVERN_APPEARED,
    WALKING_ACROSS,
    AT_TAVERN
}

interface IntroductionProps {
};

const IntroductionPage: React.FC<IntroductionProps> = (props) => {
    const [phase, changePhase] = React.useState(IntroductionStates.WALKING);

    // When loaded, set out timeouts for all phase changes
    React.useEffect(() => {
        const TO_TAVERN_APPEAR = 10000;
        const tavernAppear = setTimeout(() => changePhase(IntroductionStates.TAVERN_APPEARED), TO_TAVERN_APPEAR);

        const TO_WALK_ACROSS = TO_TAVERN_APPEAR + 3000;
        const walkingAcross = setTimeout(() => changePhase(IntroductionStates.WALKING_ACROSS), TO_WALK_ACROSS);

        const AT_TAVERN = TO_WALK_ACROSS + 5000;
        const atTavern = setTimeout(() => changePhase(IntroductionStates.AT_TAVERN), AT_TAVERN);
        return () => {
            clearTimeout(tavernAppear);
            clearTimeout(walkingAcross);
            clearTimeout(atTavern);
        }
    }, []);

    if (!isLoggedIn()) {
        return <Redirect to={PAGES.LOGIN} />;
    }
    return <div>
        <ScrollingBackground paused={phase === IntroductionStates.WALKING_ACROSS ||
            phase === IntroductionStates.AT_TAVERN}
            image={`url(${require("../images/outside.png")})`}
        />
        {phase !== IntroductionStates.WALKING ? <div style={{
            position: "absolute",
            right: "0em",
            bottom: "20%",
            width: "25em",
            overflowX: "hidden"
        }}>
            <img
                src={require("../images/tavern.png")}
                style={{
                    width: "100%",
                    animation: "slide 3s linear"
                }}
                alt="A mysterious tavern"
            />
        </div> : null}
        <div style={{
            position: "absolute",
            left: phase === IntroductionStates.WALKING_ACROSS ||
                phase === IntroductionStates.AT_TAVERN ? "calc(100% - 20em)" : "10%",
            bottom: "20%",
            transition: "left 5s linear"
        }}>
            <PlayerGif
                action={phase === IntroductionStates.AT_TAVERN ? PlayerActions.IDLE : PlayerActions.WALKING}
                time={DEFAULT_ACTION_TIME}
                startTime={0}
                title=""
                height={10}
            />
        </div>
        {phase === IntroductionStates.AT_TAVERN ? <Modal
            title="A strange tavern"
            hideClose
            onClose={() => null}
        >
            <p>
                It seems like you've been walking on this road for ages. 
                You're not entirely sure where you are, where you came from, or where you're going. 
                You just know you don't want to get caught outside at night.
            </p>
            <p>
                Luckily, you've finally found this tavern along the road. Maybe you could sleep here for the night.
                Maybe the owner will be kind enough to let you stay, seeing as you have no money.
            </p>
            <p>
                Standing around won't help, time to go in and ask.
            </p>
            <div style={{ textAlign: "center" }}>
                <Link style={buttonStyle} to={PAGES.INTRODUCTION_2} >
                    Enter the Tavern
                </Link>
            </div>
        </Modal> : null}
    </div>;
}

IntroductionPage.displayName = "IntroductionPage";

export { IntroductionPage }