import * as React from 'react';
import { InstanceMenu } from '../../InstanceMenu';
import { isLoggedIn } from '../../api/makeCall';
import { Redirect } from 'react-router-dom';
import { PAGES } from '../../pages';
import { TavernBuilding } from './tavern';
import { Castle } from './castle';

interface StateProps {
};

type TownProps = StateProps;

export const Town: React.FC<TownProps> = (props) => {
    if (!isLoggedIn()) {
        return <Redirect to={PAGES.LOGIN} />;
    }

    return <div style={{
        height: "100vh",
        width: "max(100vw, 45em)"
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
        </div>
        
        <InstanceMenu />
    </div>;
}