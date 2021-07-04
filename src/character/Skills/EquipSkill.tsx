import * as React from 'react';
import { SkillInfo } from '../../api/ApiObjects';
import { SkillDisplay } from './SkillDisplay';
import { getSkillData, BLANK_SKILL, SkillElement } from './SkillData';

interface EquipSkillProps {
    equipped: SkillInfo[];
    index: number;
    skills: SkillInfo[];
    onChange: (newSkill: SkillInfo) => void;
    playerElement: SkillElement;
}


export const EquipSkill: React.FC<EquipSkillProps> = (props) => {
    const info = props.equipped[props.index];
    const availableSkills = props.skills.filter(skill => {
        const element = getSkillData(skill.skill_id, skill.skill_level).elem;
        return element === SkillElement.NEUTRAL || element === props.playerElement;
    });
    return <fieldset style={{ display: "inline-block" }}>
        <legend>Skill Slot {props.index + 1}</legend>
        <SkillDisplay info={info} />
        <select
            style={{ display: "block" }}
            onChange={(e) => props.onChange(JSON.parse(e.target.value))}
            value={JSON.stringify(info)}
        >
            {[BLANK_SKILL].concat(availableSkills).map(skill =>
                <option
                    key={JSON.stringify(skill)}
                    disabled={
                        props.equipped.map(skill => skill.skill_id).includes(skill.skill_id) &&
                        skill.skill_id !== BLANK_SKILL.skill_id &&
                        skill.skill_id !== info.skill_id
                    }
                    value={JSON.stringify(skill)}
                >
                    {getSkillData(skill.skill_id, skill.skill_level).name}
                </option>
            )}
        </select>
    </fieldset>;
}