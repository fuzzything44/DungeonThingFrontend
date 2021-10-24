import * as React from 'react';
import { InstanceMenu } from '../InstanceMenu';
import { connect } from 'react-redux';
import { RootState, store } from '../redux/store';
import { border, backgroundSecondary, backgroundColor } from '../styles';
import { formatNumber } from '../Util/numberFormat';
import { Attribute, ATTRIBUTES } from './Attribute';
import { ErrorBox } from '../Util/ErrorBox';
import { callGetAttributes, GetAttributesResponse } from '../api/ApiObjects';
import { setAttributeLevel } from '../redux/player/actions';
import { PlayerState } from '../redux/player/types';
import { TitleContent } from '../Util/TitleContent';
import { SkillMenu } from './Skills/SkillMenu';
import { SkillElement } from './Skills/SkillData';
import { ATTACKS_PER_MIN } from '../combat/combatRunner';
import { DAMAGE_FUZZING } from '../combat/CombatSim/CombatActor';

interface StateProps {
    name: string;
    hp: number;
    attack: number;
    critRate: number;
    critDmg: number;
    attributes: PlayerState["attributes"];
    maxFloor: number;
    element: SkillElement;
};

interface PassedProps {

};

type CharacterProps = StateProps & PassedProps;

const CharacterPageUnmapped: React.FC<CharacterProps> = (props) => {
    const [attributeError, changeAttributeError] = React.useState("");
    React.useEffect(() => {
        callGetAttributes({}).then(attributes => {
            let key: keyof GetAttributesResponse;
            for (key in attributes) {
                store.dispatch(setAttributeLevel(key, attributes[key].level));
            }
        });
    }, []);

    const avgdamage = props.attack / ATTACKS_PER_MIN;
    const minDmg = formatNumber(avgdamage * (1 - DAMAGE_FUZZING));
    const maxDmg = formatNumber(avgdamage * (1 + DAMAGE_FUZZING));

    return <div style={{
        minHeight: "100vh",
        backgroundImage: `url(${require("../images/wood.png")})`,
        backgroundRepeat: "repeat",
        backgroundSize: "15em auto"
    }}>
        <h1 style={{
            ...backgroundSecondary,
            ...border,
            borderRadius: "0.5em",
            padding: "0.6em",
            marginLeft: "2em",
            marginRight: "2em",
            position: "relative",
            top: "3.5em",
            marginBottom: "3.5em",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.5em",
            display: "block"
        }}>
            {props.name}
        </h1>
        <div style={{ display: "flex" }}>
            <TitleContent
                title={<h2>Character Stats</h2>}
                style={{
                    ...backgroundColor,
                    ...border,
                    borderRadius: "0.4em",
                    margin: "1em"
                }}
            >
                <table>
                    <tbody style={{ textAlign: "left" }}>
                        <tr><th>Max HP</th><td>{formatNumber(props.hp)}</td></tr>
                        <tr><th>Damage</th><td>{minDmg} ~ {maxDmg}</td></tr>
                        <tr><th>Crit Rate</th><td>{formatNumber(props.critRate)}%</td></tr>
                        <tr><th>Crit Damage</th><td>{formatNumber(props.critDmg * 100)}%</td></tr>
                        {(() => {
                            switch (props.element) {
                                case SkillElement.NEUTRAL:
                                    return null;
                                case SkillElement.FIRE:
                                    return <tr><th>Element</th><td style={{ fontWeight: "bold", color: "#D22" }}>Fire</td></tr>;
                                case SkillElement.WATER:
                                    return <tr><th>Element</th><td style={{ fontWeight: "bold", color: "#22D" }}>Water</td></tr>;
                                case SkillElement.EARTH:
                                    return <tr><th>Element</th><td style={{ fontWeight: "bold", color: "#080" }}>Earth</td></tr>;
                                case SkillElement.AIR:
                                    return <tr><th>Element</th><td style={{ fontWeight: "bold", color: "#BB3" }}>Air</td></tr>;
                                default:
                                    return ((_: never) => null)(props.element);
                            }
                        })()}
                    </tbody>
                </table>
            </TitleContent>
            <TitleContent
                style={{
                    ...backgroundColor,
                    ...border,
                    borderRadius: "0.4em",
                    flexGrow: 1,
                    margin: "1em"
                }}
                title={<h2>Attributes</h2>}
            >
                {attributeError ? <ErrorBox message={attributeError} /> : null}
                {Object.keys(ATTRIBUTES).map((_key) => {
                    const key: keyof typeof ATTRIBUTES = _key as keyof typeof ATTRIBUTES;
                    if (props.maxFloor < ATTRIBUTES[key].floorVisible) {
                        return null;
                    }
                    return <Attribute
                        key={key}
                        attribute={key}
                        level={props.attributes[key]}
                        changeError={changeAttributeError}
                    />
                })}
            </TitleContent>
        </div>
        <div style={{
            margin: "1em",
            padding: "0.8em",
            boxSizing: "border-box"
        }}>
            {props.maxFloor >= ATTRIBUTES.skill_slots.floorVisible ? <SkillMenu /> :
                <section style={{ ...backgroundColor, ...border, borderRadius: "0.4em", padding: "0.5em", textAlign: "center" }}>
                    Locked. Come back once you've reached floor {ATTRIBUTES.skill_slots.floorVisible} of the tavern cellar
                </section>}
        </div>
        {/* Used to make the background expand into the margin of the previous div */}
        <div style={{ height: "1px" }} />
        <InstanceMenu />
    </div>;
}

CharacterPageUnmapped.displayName = "CharacterPage";


const mapStateToProps = (state: RootState): StateProps => {
    return {
        name: state.player.name,
        hp: state.player.hp,
        attack: state.player.attack,
        critRate: state.player.crit_rate,
        critDmg: state.player.crit_dmg,
        attributes: state.player.attributes,
        maxFloor: state.player.max_floor,
        element: state.player.element
    };
}

const CharacterPage = connect(mapStateToProps)(CharacterPageUnmapped);

export { CharacterPage };