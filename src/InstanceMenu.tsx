import * as React from 'react';
import { border } from './styles';

interface InstanceMenuProps {

}

const InstanceMenu: React.FC<InstanceMenuProps> = (props) => {
    return <div
        style={{
            borderBottom: border.border,
            borderLeft: border.border,
            borderBottomLeftRadius: "0.7em",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "2em",
            width: "5em",
            height: "5em",
            position: "fixed",
            top: "0",
            right: "0"
        }}
    >
        Instance menu here
    </div>;
};

InstanceMenu.displayName = "InstanceMenu";

export { InstanceMenu };