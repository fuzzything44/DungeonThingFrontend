import { Tutorial } from "./Tutorial";
import React from "react";

const GuildTut: React.FC<{}> = () => {
    return <>
        <p>
            Another 5 floors down, another feature unlocked.
        </p>
        <p>
            This time it's Guilds! (Wow, couldn't have guessed that from the title).
        </p>
        <p>
            Guilds are pretty simple - either find one to apply to (joining the discord might help), or create your own and start recruiting.
            After that, it's just getting people to add extra items, mana, and gold into guild storage, which then lets you upgrade guild bonuses.
            Bonuses are applied to everyone in the guild, so work together and raise them as high as you can!
        </p>
        <p>
            Guild leaders and submasters can also distribute items (but not mana or gold) in storage to players in the guild, if you have extra of something.
        </p>
    </>;
};

GuildTut.displayName = "GuildTutorial";

const GuildTutorial: Tutorial = {
    canShow: ({ floor }) => floor >= 35,
    display: GuildTut,
    name: "Guilds",
    id: "guild"
}

export { GuildTutorial }