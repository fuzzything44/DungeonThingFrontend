import { Tutorial } from "./Tutorial";
import React from "react";

const AutoChallenge: React.FC<{}> = () => {
    return <>
        <p>
            Great job on beating floor 10!
        </p>
        <p>
            You've now unlocked the Auto-Challenge feature.
            This continually challenges the boss for you.
        </p>
        <p>
            Auto-Challenge has 2 restrictions:
            <ul>
                <li>When you lose a boss fight, auto-challenge turns off.</li>
                <li>
                    You can't auto-challenge past your highest floor ever (applies only in the tavern).
                    This means it'll turn off once you reach your highest floor, and the button disappears when you're at it. 
                </li>
            </ul>
        </p>
        <p>
            Note that currently, you still need the browser tab open and active for auto-challenge to work. 
            This will probably change eventually so that you can close the tab and keep fighting bosses while you sleep.
        </p>
    </>;
};

AutoChallenge.displayName = "AutoChallenge";

const AutoChallengeTutorial: Tutorial = {
    canShow: ({ floor }) => floor > 10,
    display: AutoChallenge,
    name: "Auto Challenge!",
    id: "autochallenge"
}

export { AutoChallengeTutorial }