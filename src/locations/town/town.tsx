import * as React from 'react';
import { InstanceMenu } from '../../InstanceMenu';
import { TavernBuilding } from './tavern';
import { Castle } from './castle';
import { ForgeBuilding } from './forgeBuilding';

interface StateProps {
};

type TownProps = StateProps;

export const Town: React.FC<TownProps> = (props) => {
    return <div style={{
        height: "100vh",
        width: "max(100vw, 65em)"
    }}>
        {/* Background */}
        <div style={{
            float: "left",
            width: "100%",
            height: "100%",
            backgroundImage: `url(${require("../../images/outside.png")})`,
            backgroundSize: "25em 100%",
            backgroundRepeat: "repeat-x"
        }}>
            {/* Buildings */}
            <TavernBuilding />
            <Castle />
            <ForgeBuilding />
        </div>
        
        <InstanceMenu />
    </div>;
}