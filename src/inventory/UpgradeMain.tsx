import * as React from 'react';
import { UpgradeModes } from './UpgradeEquip';
import { EquipInfo } from '../api/ApiObjects';
import { LevelUp } from './Upgrades/LevelUp';
import { RankUp } from './Upgrades/RankUp';
import { Reinforce } from './Upgrades/Reinforce';

interface UpgradeMainProps {
    info: EquipInfo;
    mode: UpgradeModes;
    changeMode: (newMode: UpgradeModes) => void;
}

const UpgradeMain: React.FC<UpgradeMainProps> = (props) => {
    switch (props.mode) {
        case UpgradeModes.LEVEL_UP:
            return <LevelUp
                equip={props.info}
                changeMode={props.changeMode}
            />;
        case UpgradeModes.RANK_UP:
            return <RankUp equip={props.info} />
        case UpgradeModes.REINFORCE:
            return <Reinforce equip={props.info} />
        default:
            return ((_: never) => null)(props.mode);
    }
}

UpgradeMain.displayName = "UpgradeMain";

export { UpgradeMain }