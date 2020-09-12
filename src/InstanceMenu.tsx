import * as React from 'react';
import { border } from './styles';
import { RootState } from './redux/store';
import { connect } from 'react-redux';
import { formatNumber } from './Util/numberFormat';
import { Icon } from './Util/Icon';
import { Link } from 'react-router-dom';
import { PAGES } from './App';

interface StateProps {
    mana: number;
    manaPerMin: number;
};

type InstanceMenuProps = StateProps & {

}

const InstanceMenuBase: React.FC<InstanceMenuProps> = (props) => {
    return <div
        style={{
            borderBottom: border.border,
            borderLeft: border.border,
            borderBottomLeftRadius: "0.7em",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            position: "fixed",
            padding: "0.5em",
            top: "0",
            right: "0"
        }}
    >
        <div style={{
            float: "left",
            padding: "0.5em",
            paddingTop: "0"
        }}>
            {formatNumber(props.mana)} <Icon image={require("./images/mana.png")} name="Mana" /><br />
            {formatNumber(props.manaPerMin)} <Icon image={require("./images/mana.png")} name="Mana" />/minute<br />
        </div>
        <div style={{ float: "left" }}>
            <Link to={PAGES.TAVERN}>
                <img
                    src={require("./images/barrel.png")}
                    style={{
                        height: "2em",
                        padding: "0.5em"
                    }}
                    alt="To tavern"
                    title="To tavern"
                />
            </Link>
        </div>
        <div style={{ float: "left" }}>
            <Link to={PAGES.SETTINGS}>
                <img
                    src={require("./images/gear.png")}
                    style={{
                        height: "2em",
                        padding: "0.5em"
                    }}
                    alt="Account Settings"
                    title="Account"
                />
            </Link>
        </div>
    </div>;
};

InstanceMenuBase.displayName = "InstanceMenu";

const mapStateToProps = (state: RootState): StateProps => {
    return {
        mana: state.player.mana,
        manaPerMin: state.player.manaPerMin
    };
}
const InstanceMenu = connect(mapStateToProps)(InstanceMenuBase);
export { InstanceMenu };