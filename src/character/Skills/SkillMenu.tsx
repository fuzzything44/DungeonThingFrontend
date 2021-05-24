import * as React from 'react';
import { RootState, store } from '../../redux/store';
import { connect } from 'react-redux';
import { SkillInfo, callGetSkills, callSetAssignedSkills, callGetAssignedSkills } from '../../api/ApiObjects';
import { SkillDisplay } from './SkillDisplay';
import { TitleContent } from '../../Util/TitleContent';
import { EquipSkill } from './EquipSkill';
import { BLANK_SKILL } from './SkillData';
import { buttonStyle } from '../../styles';
import { setSkills, setUsedSkills } from '../../redux/player/actions';
import { ErrorBox } from '../../Util/ErrorBox';

interface PassedProps {

}

interface StateProps {
    skillSlots: number;
    skills: SkillInfo[];
    equipped: SkillInfo[];
};

type SkillProps = PassedProps & StateProps;


const SkillUnmapped: React.FC<SkillProps> = (props) => {
    const paddedEquipped = props.equipped.concat(Array(props.skillSlots - props.equipped.length).fill(BLANK_SKILL));
    const [currentEquip, changeEquip] = React.useState(paddedEquipped);
    const [error, changeError] = React.useState("");

    // Fixes issue: When buying new skill slots, the equipped skills list won't update to add the extra slot
    if (paddedEquipped.length > currentEquip.length) {
        // Could add the exact amount, but it won't be much of an issue, since it's most likely 1 off
        // And this will run again if it's off by more. With low skill slots, this isn't a performance problem.
        changeEquip(currentEquip.concat([BLANK_SKILL]));
    }

    React.useEffect(() => {
        callGetSkills({}).then((skills) => {
            store.dispatch(setSkills(skills.skills));
        }).catch(e => changeError(e.message));
    }, []);

    return <TitleContent title={<h2>Skills</h2>}>
        {error ? <ErrorBox message={error} /> : null}
        <h3 style={{ textAlign: "center", display: "block" }}>Acquired Skills</h3>
        {props.skills.map(skill => <SkillDisplay key={JSON.stringify(skill)} info={skill} />)}
        <h3 style={{ textAlign: "center", display: "block", paddingTop: "0.5em" }}>Equipped Skills</h3>
        {currentEquip.map((_, index) => <EquipSkill
            key={index}
            equipped={currentEquip}
            index={index}
            skills={props.skills}
            onChange={(newSkill: SkillInfo) => {
                // Technically not functional, but close enough since js doesn't do this easily in functional style
                let newSkillArr = [...currentEquip];
                newSkillArr[index] = newSkill;
                // And here we're back to functional programming 
                changeEquip(newSkillArr);
            }}
        />)}
        <br/>
        {JSON.stringify(currentEquip) !== JSON.stringify(paddedEquipped) ?
            <div style={{ textAlign: "center" }}>
                <button
                    style={{
                        ...buttonStyle,
                        margin: "1em"
                    }}
                    onClick={() => {
                        changeError("");
                        callSetAssignedSkills({
                            skills: currentEquip.map(sk => sk.skill_id).filter(id => id !== 0)
                        }).catch(e => changeError(e.message));
                        callGetAssignedSkills({}).then(skills => store.dispatch(setUsedSkills(skills.skills)));
                    }}
                >
                    Save Changes
                </button>
                <button
                    style={buttonStyle}
                    onClick={() => changeEquip(paddedEquipped)}
                >
                    Discard Changes
                </button>
            </div> : null}
    </TitleContent>;
}

SkillUnmapped.displayName = "SkillMenu";

const mapStateToProps = (state: RootState): StateProps => {
    return {
        skillSlots: state.player.skill_slots,
        skills: state.player.skills,
        equipped: state.player.usedSkills
    };
}

let SkillMenu = connect(mapStateToProps)(SkillUnmapped);

export { SkillMenu };