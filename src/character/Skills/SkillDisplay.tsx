import * as React from 'react';
import { SkillInfo } from '../../api/ApiObjects';
import { buttonStyle, outlineText } from '../../styles';
import { getSkillData, SkillElement } from './SkillData';
import { Modal } from '../../Util/Modal';

interface SkillDisplayProps {
    info: SkillInfo;
}

interface ElemInfo {
    color: string;
    name: string;
}
const ELEM_MAP: {[e in SkillElement]: ElemInfo} = {
    [SkillElement.NEUTRAL]: { color: "black", name: "Neutral" },
    [SkillElement.FIRE]: { color: "red", name: "Fire" },
    [SkillElement.WATER]: { color: "blue", name: "Water" },
    [SkillElement.EARTH]: { color: "green", name: "Earth" },
    [SkillElement.AIR]: { color: "lightgray", name: "Air" }
}

export const SkillDisplay: React.FC<SkillDisplayProps> = (props) => {
    const data = getSkillData(props.info.skill_id, props.info.skill_level);

    const [showModal, changeShowModal] = React.useState(false);

    return <>
        <div style={{
            width: "5em",
            height: "5em",
            position: "relative", // for absolute positioning to work
            display: "inline-block",
            margin: "0.5em"
        }}>
            <button
                style={{
                    ...buttonStyle,
                    backgroundColor: undefined,
                    borderColor: ELEM_MAP[data.elem].color,
                    borderWidth: "2px",
                    width: "4em",
                    height: "4em",
                    margin: "0.5em"
                }}
                onClick={() => changeShowModal(true)}
            >
                <img style={{ width: "100%" }} src={data.image} alt={data.name} title={data.name} />
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "1.5em",
                    height: "1.5em",
                    backgroundColor: "yellow",
                    textAlign: "center",
                    border: "1px solid #CCCC00"
                }}>
                    {data.charge}
                </div>
                <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "1.5em",
                    height: "1.5em",
                    backgroundColor: "red",
                    textAlign: "center",
                    border: "1px solid #CC0000"
                }}>
                    {data.uses}
                </div>
                <div style={{
                    position: "absolute",
                    bottom: "0.5em",
                    right: "0.5em",
                    ...outlineText
                }}>
                    {props.info.skill_level >= data.maxLvl ? "MAX" : "Lv. " + (props.info.skill_level + 1)}
                </div>
            </button>
        </div>
        {showModal ? <Modal
            title={`Skill Info - ${data.name} Lv. ${props.info.skill_level + 1}`}
            onClose={() => changeShowModal(false)}
        >
            <div style={{ textAlign: "center"}}>
                <img style={{ width: "4em" }} src={data.image} alt={data.name} title={data.name} />
            </div>

            <p>{data.desc}</p>
            <p>Charge time: <span style={{
                width: "1.5em",
                height: "1.5em",
                backgroundColor: "yellow",
                textAlign: "center",
                display: "inline-block",
                border: "1px solid #CCCC00"
            }}>
                {data.charge}
            </span></p>
            <p>Uses per combat: <span style={{
                width: "1.5em",
                height: "1.5em",
                backgroundColor: "red",
                textAlign: "center",
                display: "inline-block",
                border: "1px solid #CC0000"
            }}>
                {data.uses}
            </span></p>
            <p>Elemental Alignment: {ELEM_MAP[data.elem].name}</p>
        </Modal> : null}
    </>;
}