import * as React from 'react';
import { border } from './styles';
import { RootState } from './redux/store';
import { connect } from 'react-redux';
import { formatNumber } from './Util/numberFormat';
import { Icon } from './Util/Icon';

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
            padding: "1em",
            position: "fixed",
            top: "0",
            right: "0"
        }}
    >
        {formatNumber(props.mana)} <Icon image={require("./images/mana.png")} name="Mana" /><br />
        {formatNumber(props.manaPerMin)} <Icon image={require("./images/mana.png")} name="Mana" />/minute<br />
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