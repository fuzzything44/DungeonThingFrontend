import { Tutorial } from "./Tutorial";
import React from "react";
import { ATTRIBUTES } from "../character/Attribute";

const Skill: React.FC<{}> = () => {
    return <>
        <p>
            You've unlocked skill slots! Purchase some on your player page.
        </p>
        <p>
            Skill slots let you use skills in combat. 
            Once you have some slots and some skills, assign a skill to a slot on your player page, and then watch as you use it against enemies!
        </p>
        <p>
            Skills come from beating bosses, usually. Different dungeons and floors will have different skills available.
            Skills also come in different levels, with higher level skills being stronger, but also rarer.
        </p>
        <p>
            Note that each skill has a charge time and a use amount. In combat, each basic attack slowly charges you up,
            and once you've hit the charge count for the next skill, you use instead of your next attack!
        </p>
        <p>
            Skills are used in order, restarting from the beginning of the list once all assigned skills have been used.
            If a skill has hit its max use count for the combat, it'll be skipped and the next skill in line will be used instead.
        </p>
    </>;
};

Skill.displayName = "SkillTutorial";

const SkillTutorial: Tutorial = {
    canShow: ({ floor }) => floor >= ATTRIBUTES.skill_slots.floorVisible,
    display: Skill,
    name: "Skills",
    id: "skill"
}

export { SkillTutorial }