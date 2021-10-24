import { Tutorial } from "./Tutorial";
import React from "react";

const Floor100: React.FC<{}> = () => {
    return <>
        <p>
            You've finally done it. 100 floors deep.
        </p>
        <p>
            Something significant has to happen here, right? Surely it can't just be the same things, again and again.
        </p>
        <p>
            For that matter, where even is this place? And how did you get here again? Your memory still hasn't returned... why haven't you thought to ask the <span style={{ color: "darkgreen"}}>barkeeper</span> what's going on? They've got to know <i>something</i> at least.
        </p>
        <hr/>
        <blockquote style={{ color: "darkgreen" }} >
            <p>
                Those really aren't questions you want to know the answer to. Trust me on this, you're better off knowing.<br />
                ...<br />
                ...
            </p>
            <p>
                Fine, it's your life. I don't know everything about this place, but I'll tell you what I do know.
            </p>
            <p>
                This place is only partly real - it's some collection of objects held together through powerful magic. The farther out from here you go, the more things start to break apart. Not just physical objects, the very laws of physics fail once you get far enough out. You don't want to go there.
            </p>
            <p>
                And at the center of it all? Well, none other than the deranged god who calls himself ???????. He seems content to create his little world here, and occasionally drag some poor fools in here, when he feels like too many have died. 
            </p>
            <p>
                You'd best hope he doesn't take a personal interest in you. That's when things get really dangerous.
            </p>
        </blockquote>
        <p>
            For some reason, you've got a bad feeling about what you might face this floor...
        </p>
    </>;
};

Floor100.displayName = "Floor100";

const Floor100Encounter: Tutorial = {
    canShow: ({ floor }) => floor >= 100,
    display: Floor100,
    name: "Time to face reality",
    id: "f100",
    closeMessageOverride: "Oh my..."
}

export { Floor100Encounter }