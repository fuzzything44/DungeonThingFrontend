import * as React from 'react';
import { TitleContent } from '../Util/TitleContent';
import { buttonStyle } from '../styles';
import { RootState, store } from '../redux/store';
import { connect } from 'react-redux';
import { callUpgradeAttribute, callStatus } from '../api/ApiObjects';
import { setPlayerInfo, setMana, setAttributeLevel } from '../redux/player/actions';
import { formatNumber } from '../Util/numberFormat';

export const ATTRIBUTES = {
    attack_dmg: {
        name: "Attack",
        description: "+1 attack per level",
        cost: (level: number) => {
            const costDoubler = Math.floor(Math.pow(2, level / 100));
            return costDoubler * level * 250;
        },
        max: undefined,
        floorVisible: 0
    },
    crit_rate: {
        name: "Critical Rate",
        description: "+1% critical hit chance per level",
        cost: (level: number) => [100, 500, 1000, 10000, 1 * 1000 * 1000][level],
        max: 5,
        floorVisible: 0
    },
    crit_dmg: {
        name: "Critical Damage",
        description: "+10% critical damage per level",
        cost: (level: number) => Math.floor(Math.pow(level + 5, 3) * 20),
        max: 10,
        floorVisible: 0
    },
    skill_slots: {
        name: "Skill Slots",
        description: "+1 equippable skill per level",
        cost: (level: number) => [10 * 1000 * 1000, 100 * 1000 * 1000][level],
        max: 2,
        floorVisible: 30
    }
}
interface PassedProps {
    attribute: keyof typeof ATTRIBUTES;
    level: number;
    changeError: (error: string) => void;
}

interface StateProps {
    mana: number;
};

type AttributeProps = PassedProps & StateProps;

const AttributeUnmapped: React.FC<AttributeProps> = (props) => {
    const attribute = ATTRIBUTES[props.attribute];
    const levelCost = attribute.cost(props.level);

    return <TitleContent
        title={<h3>{attribute.name}</h3>}
        style={{ margin: "1.5em" }}
    >
        {attribute.description}<br />
        Level {props.level} {attribute.max ? "/ " + attribute.max : null}
        {attribute.max === undefined || attribute.max > props.level ? <button
            style={{
                ...buttonStyle,
                margin: "0.2em",
                backgroundColor: props.mana < levelCost ? "darkgray" : buttonStyle.backgroundColor
            }}
            disabled={props.mana < levelCost}
            onClick={async () => {
                try {
                    // eslint-disable-next-line
                    const [_, status] = await Promise.all([callUpgradeAttribute({ name: props.attribute }), callStatus({})]);
                    store.dispatch(setPlayerInfo(status));
                    store.dispatch(setMana(store.getState().player.mana - levelCost));
                    store.dispatch(setAttributeLevel(props.attribute, props.level + 1));
                    props.changeError("");
                } catch (e) {
                    props.changeError(e.message);
                }

            }}
        >
            +1 ({formatNumber(levelCost)} mana)
        </button> : null}
    </TitleContent>;
}

AttributeUnmapped.displayName = "Attribute";

const mapStateToProps = (state: RootState): StateProps => {
    return {
        mana: state.player.mana
    };
}

let Attribute = connect(mapStateToProps)(AttributeUnmapped);

export { Attribute };