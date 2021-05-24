import * as React from "react";

import { TitleContent } from "../Util/TitleContent";
import { RootState, store } from "../redux/store";
import { SetHpDisplayAction } from "../redux/preferences/types";
import { connect } from "react-redux";
import { setHpDisplay } from "../redux/preferences/actions";

interface StateProps {
    dmgDisplay: SetHpDisplayAction["display"];
}

type MiscSettingsProps = StateProps;

const MiscSettingsUnmapped: React.FC<MiscSettingsProps> = (props) => {
    return <TitleContent title={<h2>Miscellaneous Settings</h2>}>
        <label htmlFor="setDmgDisplay">Damage Display: </label>
        <select
            id="setDmgDisplay"
            value={props.dmgDisplay}
            onChange={(e) => {
                if (e.target.value === "VAL" || e.target.value === "PERCENT") {
                    store.dispatch(setHpDisplay(e.target.value));
                }
            }}
        >
            <option value="VAL">Exact Values</option>
            <option value="PERCENT">Percent</option>
        </select>
    </TitleContent>;

};

const mapStateToProps = (state: RootState): StateProps => {
    return {
        dmgDisplay: state.preferences.hpDisplay
    };
}

const MiscSettings = connect(mapStateToProps)(MiscSettingsUnmapped);
export { MiscSettings };