import { Tutorial } from "./Tutorial";
import React from "react";

const MassDestroy: React.FC<{}> = () => {
    return <>
        <p>
            Great job on reaching floor 20!
        </p>
        <p>
            Get ready for another convenience upgrade: mass destroy.
            You can now destroy multiple equips at once.
        </p>
        <p>
            This appears in your inventory page. 
            Just choose a rank of equipment from the mass destroy dropdown and click the mass destroy button.
            Then, all equipment of that rank (and the type you're filtering right above) will be destroyed.
        </p>
        <p>
            Ranking up still has to be done manually, sorry.
            Eventually you'll get a way to combine rank orbs directly to remove that intermediate step.
        </p>
    </>;
};

MassDestroy.displayName = "MassDestroy";

const MassDestroyTutorial: Tutorial = {
    canShow: ({ floor }) => floor >= 20,
    display: MassDestroy,
    name: "Mass equipment destruction",
    id: "massdestroy"
}

export { MassDestroyTutorial }