import * as React from 'react';
import { InstanceMenu } from '../InstanceMenu';
import { connect } from 'react-redux';
import { RootState } from '../redux/store';
import { ChangePassword } from './ChangePassword';
import { backgroundSecondary, border, buttonStyle } from '../styles';
import { TitleContent } from '../Util/TitleContent';
import { isLoggedIn } from '../api/makeCall';
import { Redirect } from 'react-router-dom';
import { PAGES } from '../App';

interface StateProps {
};

type SettingsProps = StateProps;

const SettingsPageUnmapped: React.FC<SettingsProps> = (props) => {
    if (!isLoggedIn()) {
        return <Redirect to={PAGES.LOGIN} />;
    }

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
            Account Management
        </h1>
        <div style={{ height: "2em" }} />
        <div style={{ marginLeft: "5em", marginRight: "5em"}}>
            <ChangePassword />
        </div>
        <div style={{ height: "2em"}} />
        <div style={{ marginLeft: "5em", marginRight: "5em" }}>
            <TitleContent title={<h2>Links</h2>}>
                <div style={{height: "0.3em"}} />
                <a
                    style={{
                        ...buttonStyle,
                        margin: "0.3em"
                    }}
                    href="https://discord.gg/E8vZ5VS"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Join the Discord
                </a>
                <a
                    style={{
                        ...buttonStyle,
                        margin: "0.3em"
                    }}
                    href="https://github.com/fuzzything44/DungeonThingFrontend"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Contribute or Report issues on GitHub
                </a>
                <div style={{ height: "0.3em" }} />
            </TitleContent>
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