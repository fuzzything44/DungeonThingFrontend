import * as React from 'react';
import { Modal } from '../Util/Modal';
import { UpgradeButton } from './UpgradeButton';
import { UpgradeMain } from './UpgradeMain';
import { EquipInfo } from '../api/ApiObjects';
import { border } from '../styles';

interface UpgradeEquipProps {
    info: EquipInfo;
    onClose: () => void;
}

export enum UpgradeModes {
    LEVEL_UP,
    RANK_UP,
    REINFORCE
}
const UpgradeEquip: React.FC<UpgradeEquipProps> = (props) => {
    const [upgradeMode, changeMode] = React.useState(UpgradeModes.LEVEL_UP);

    return <Modal onClose={props.onClose} title="Upgrade Equip" noPad>
        <div style={{ display: "flex" }}>
            <div style={{ borderRight: border.border}}>
                <UpgradeButton
                    selected={upgradeMode === UpgradeModes.LEVEL_UP}
                    image={require("../images/level_up.png")}
                    text="Level Up"
                    onClick={() => changeMode(UpgradeModes.LEVEL_UP)}
                />
                <UpgradeButton
                    selected={upgradeMode === UpgradeModes.RANK_UP}
                    image={require("../images/rank_up.png")}
                    text="Rank Up"
                    onClick={() => changeMode(UpgradeModes.RANK_UP)}
                />
                <UpgradeButton
                    selected={upgradeMode === UpgradeModes.REINFORCE}
                    image={require("../images/reinforce.png")}
                    text="Reinforce"
                    onClick={() => changeMode(UpgradeModes.REINFORCE)}
                />
            </div>
            <div style={{ minWidth: "20em", maxWidth: "40em" }}>
                <UpgradeMain info={props.info} mode={upgradeMode} changeMode={changeMode} key={upgradeMode} />
            </div>
        </div>
    </Modal>
}

UpgradeEquip.displayName = "UpgradeEquip";

export { UpgradeEquip }