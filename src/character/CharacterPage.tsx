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

interface StateProps {
    name: string;
    hp: number;
    attack: number;
    critRate: number;
    critDmg: number;
    attributes: PlayerState["attributes"];
};

type CharacterProps = StateProps;

let lastAttributeFetch: number = 0;
const ATTRIBUTE_FETCH_INTERVAL: number = 60 * 1000;

const CharacterPageUnmapped: React.FC<CharacterProps> = (props) => {
    const [attributeError, changeAttributeError] = React.useState("");
    React.useEffect(() => {
        let timeout: NodeJS.Timeout;
        const fetchAttributes = async () => {
            lastAttributeFetch = Date.now();
            try {
                const attributes = await callGetAttributes({});
                let key: keyof GetAttributesResponse;
                for (key in attributes) {
                    store.dispatch(setAttributeLevel(key, attributes[key].level));
                }
            } catch (e) {
                changeAttributeError(e.message);
            }
            timeout = setTimeout(fetchAttributes, ATTRIBUTE_FETCH_INTERVAL);
        };
        timeout = setTimeout(fetchAttributes, Math.max(0, lastAttributeFetch - Date.now() + ATTRIBUTE_FETCH_INTERVAL));
        return () => clearTimeout(timeout);
    });
    // TODO: get attributes
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
                        <tr><th>Attack</th><td>{formatNumber(props.attack)}</td></tr>
                        <tr><th>Crit Rate</th><td>{formatNumber(props.critRate)}%</td></tr>
                        <tr><th>Crit Damage</th><td>{formatNumber(props.critDmg * 100)}%</td></tr>
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
                    return <Attribute
                        key={key}
                        attribute={key}
                        level={props.attributes[key]}
                        changeError={changeAttributeError}
                    />
                })}
            </TitleContent>
        </div>
        {/* Enable and finish when we get skills <div style={{
            ...backgroundColor,
            ...border,
            borderRadius: "0.4em",
            margin: "1em",
            padding: "0.8em",
            boxSizing: "border-box"
        }}>
            SKILLS HERE
        </div> */}
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
        attributes: state.player.attributes
    };
}

let CharacterPage = connect(mapStateToProps)(CharacterPageUnmapped);

export { CharacterPage };