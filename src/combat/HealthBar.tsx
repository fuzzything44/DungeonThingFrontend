import * as React from 'react';
import { HP } from '../redux/combat/types';
import { border, backgroundColor } from '../styles';
import { formatNumber } from '../Util/numberFormat';
import { SetHpDisplayAction } from '../redux/preferences/types';
import { RootState } from '../redux/store';
import { connect } from 'react-redux';

interface PassedProps {
    hp: HP;
    skillCharge?: number;
}

interface StateProps {
    display: SetHpDisplayAction["display"];
}

type HealthBarProps = PassedProps & StateProps

const HealthBarUnconnected: React.FC<HealthBarProps> = (props) => {
    return <div style={{
        position: "relative"
    }}>
        {props.skillCharge ? <div style={{
            position: "absolute",
            left: "-2em",
            top: "-0.2em",
            ...border,
            borderRadius: "50%",
            backgroundColor: "yellow",
            height: "1.5em",
            width: "1.5em",
            textAlign: "center"
        }}>{props.skillCharge - 1 }</div> : null }
        <div style={{
            ...border,
            ...backgroundColor,
            borderRadius: "0.2em",
            height: "1em"
        }}>
            <div
                style={{
                    position: "absolute",
                    backgroundColor: "red",
                    borderRight: border.border,
                    height: "1em",
                    width: (100 * props.hp.current / props.hp.max).toString() + "%",
                    marginBottom: "1em"
                }}
            />
            <div style={{ position: "absolute", fontSize: "small", left: "0.2em" }}>HP:</div>
            <div style={{ position: "absolute", fontSize: "small", right: "0.2em" }}>
                {props.display === "VAL" ?
                    formatNumber(props.hp.current) + "/" + formatNumber(props.hp.max) :
                    (100 * props.hp.current / props.hp.max).toFixed(2) + "%"
                }
            </div>
        </div>
    </div>;
}

HealthBarUnconnected.displayName = "HealthBar";

const mapStateToProps = (state: RootState): StateProps => {
    return { display: state.preferences.hpDisplay };
}
const HealthBar = connect(mapStateToProps)(HealthBarUnconnected);

export { HealthBar }