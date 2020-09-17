import * as React from 'react';
import { InstanceMenu } from '../InstanceMenu';
import { connect } from 'react-redux';
import { RootState } from '../redux/store';
import { TitleContent } from '../Util/TitleContent';
import { ChangePassword } from './ChangePassword';

interface StateProps {
};

type SettingsProps = StateProps;

const SettingsPageUnmapped: React.FC<SettingsProps> = (props) => {
    return <div style={{
        minHeight: "100vh",
        backgroundImage: `url(${require("../images/wood.png")})`,
        backgroundRepeat: "repeat",
        backgroundSize: "15em auto"
    }}>
        <div style={{ height: "5em" }} />
        <div style={{ marginLeft: "5em", marginRight: "5em"}}>
            <ChangePassword />
        </div>
        <InstanceMenu />
    </div>;
}

SettingsPageUnmapped.displayName = "SettingsPage";


const mapStateToProps = (state: RootState): StateProps => {
    return {
    };
}

let SettingsPage = connect(mapStateToProps)(SettingsPageUnmapped);

export { SettingsPage };