import * as React from 'react';
import { border, buttonStyle } from '../styles';
import { EquipInfo as EquipInfoData, callDestroy, callEquipItem } from '../api/ApiObjects';
import { standardBorderColors, getEquipImage } from './itemInfo';
import { UpgradeEquip } from './UpgradeEquip';
import { BoxedImage } from '../Util/BoxedImage';
import { formatNumber } from '../Util/numberFormat';
import { store } from '../redux/store';
import { removeEquip, equipItem } from '../redux/inventory/actions';

interface EquipInfoProps {
    info: EquipInfoData;
    equipped: boolean;
}

const EquipInfo: React.FC<EquipInfoProps> = (props) => {
    const [showUpgrade, changeShowUpgrade] = React.useReducer(val => !val, false);

    return <div style={{
        ...border,
        borderRadius: "0.3em",
        margin: "0.3em",
        padding: "0.3em",
        display: "inline-block",
        width: props.equipped ? "10em" : "15em"
    }}>
        <div style={{ textAlign: "center" }}>
            {props.info.name}<br />
            <BoxedImage
                image={getEquipImage(props.info.type, props.info.rankId)}
                title={props.info.name}
                borderColor={standardBorderColors(props.info.rankId)}
                style={{ margin: "0.3em" }}
            />
        </div>
        <div style={{ display: "flex"}}>
            <div>
                + {formatNumber(props.info.strength)} {props.info.type === 0 ? "Attack" : "HP"}<br />
            </div>
            <div style={{ marginLeft: "auto" }}>
                {props.equipped ? null : <><button
                    style={{
                        ...buttonStyle,
                        margin: "0.2em"
                    }}
                    onClick={async () => {
                        try {
                            await callEquipItem({ id: props.info.id });
                            store.dispatch(equipItem(props.info));
                        } catch (e) {
                            /* TODO: handle this */
                        }
                    }}
                >
                    Equip
                </button><br /></>}
                <button
                    style={{
                        ...buttonStyle,
                        margin: "0.2em"
                    }}
                    onClick={changeShowUpgrade}
                >
                    Upgrade
                </button>
                <br />
                {props.equipped ? null : <button
                    style={{
                        ...buttonStyle,
                        margin: "0.2em"
                    }}
                    onClick={async () => {
                        try {
                            await callDestroy({ id: props.info.id });
                            store.dispatch(removeEquip(props.info.id));
                        } catch (e) {
                            /* TODO: handle this */
                        }
                    }}
                >
                    Destroy
                </button>}
            </div>
        </div>
        {showUpgrade ? <UpgradeEquip info={props.info} onClose={changeShowUpgrade} /> : null}
    </div>;
}

EquipInfo.displayName = "EquipInfo";

export { EquipInfo }