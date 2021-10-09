import * as React from 'react';
import { InstanceMenu } from '../../InstanceMenu';
import { isLoggedIn } from '../../api/makeCall';
import { Redirect } from 'react-router-dom';
import { PAGES } from '../../pages';
import { ExitDoor } from '../tavernHub/ExitDoor';
import { Anvil } from './Anvil';
import { Smelter } from './Smelter';

interface StateProps {
};

type ForgeProps = StateProps;

export const Forge: React.FC<ForgeProps> = (props) => {
    if (!isLoggedIn()) {
        return <Redirect to={PAGES.LOGIN} />;
    }
    
    return <div style={{
        height: "100vh",
        width: "max(100vw, 60em)"
    }}>
        {/* Background */}
        <div style={{
            float: "left",
            width: "100%",
            height: "100%",
            backgroundImage: `url(${require("../../images/forge/forge_repeat.png")})`,
            backgroundSize: "25em 100%",
            backgroundRepeat: "repeat-x"
        }} />
        {/* Items */}
        <Smelter />
        <Anvil />
        <ExitDoor />

        <InstanceMenu />
    </div>;
}