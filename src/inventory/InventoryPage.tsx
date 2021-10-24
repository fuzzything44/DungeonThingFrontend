import * as React from 'react';
import { InstanceMenu } from '../InstanceMenu';
import { connect } from 'react-redux';
import { RootState, store } from '../redux/store';
import { border, backgroundSecondary, backgroundColor } from '../styles';
import { ItemInfo, callGetInventory, EquipInfo as EquipInfoData, callGetGifts } from '../api/ApiObjects';
import { TitleContent } from '../Util/TitleContent';
import { InventoryDisplay } from './InventoryDisplay';
import { EquipInfo } from './EquipInfo';
import { setInventory, setGifts } from '../redux/inventory/actions';
import { MassDestroy } from './MassDestroy';
import { PlayerGif, PlayerActions } from '../Util/PlayerGif';
import { DEFAULT_ACTION_TIME } from '../combat/combatRunner';
import { ErrorBox } from '../Util/ErrorBox';

type StateProps = { loaded: false } | {
    loaded: true
    items: ItemInfo[];
    equips: EquipInfoData[];
    hat: EquipInfoData;
    shirt: EquipInfoData;
    pants: EquipInfoData;
    shoes: EquipInfoData;
    weapon: EquipInfoData;
    maxFloor: number;
};

type InventoryProps = { state: StateProps };

const InventoryPageUnmapped: React.FC<InventoryProps> = (_props) => {
    const [filter, changeFilter] = React.useState(-1);
    const [error, changeError] = React.useState("");

    React.useEffect(() => {
        callGetInventory({}).then(inventory => {
            store.dispatch(setInventory(inventory));

            callGetGifts({}).then(result => {
                store.dispatch(setGifts(result.gifts));
            });
        }).catch(() => null);
    }, []);

    const props = _props.state;
    if (!props.loaded) {
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
                Inventory
        </h1>
        </div>
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
            Inventory
        </h1>
        <div style={{ height: "1em" }} />
        <div style={{ display: "flex" }}>
            <div>
                <TitleContent
                    title={<h2 style={{ textAlign: "center", display: "block" }}>You</h2>}
                    style={{
                        ...backgroundColor,
                        ...border,
                        borderRadius: "0.4em",
                        margin: "1em"
                    }}
                >
                    <div style={{ display: "flex" }}>
                        <div>
                            <EquipInfo
                                info={props.hat}
                                equipped={true}
                            /><br />
                            <EquipInfo
                                info={props.shirt}
                                equipped={true}
                            /><br />
                            <EquipInfo
                                info={props.pants}
                                equipped={true}
                            /><br />
                            <EquipInfo
                                info={props.shoes}
                                equipped={true}
                            />
                        </div>
                        <PlayerGif
                            action={PlayerActions.IDLE}
                            time={DEFAULT_ACTION_TIME}
                            startTime={0}
                            title="You"
                            height={10}
                        />
                        <div>
                            <EquipInfo
                                info={props.weapon}
                                equipped={true}
                            /><br />
                        </div>
                    </div>
                </TitleContent>
            </div>
            <TitleContent
                style={{
                    ...backgroundColor,
                    ...border,
                    borderRadius: "0.4em",
                    flexGrow: 1,
                    margin: "1em"
                }}
                title={<h2 style={{ textAlign: "center", display: "block" }}>Equipment</h2>}
                noPad
            >
                <div style={{
                    display: "flex",
                    borderBottom: border.border,
                    textAlign: "center"
                }}>
                    {["All", "Weapons", "Hats", "Shirts", "Pants", "Shoes"].map((type, index) => <button
                        key={type}
                        style={{
                            display: "block",
                            width: 100 / 6 + "%",
                            backgroundColor: filter === index - 1 ? "gray" : backgroundSecondary.backgroundColor
                        }}
                        onClick={() => changeFilter(index - 1)}
                    >
                        {type}
                    </button>)}
                </div>
                {props.maxFloor >= 20 ? <MassDestroy equips={props.equips} typeFilter={filter} /> : null}
                {error ? <ErrorBox message={error} /> : null}
                {props.equips.filter(equip => filter === -1 || equip.type === filter).map(equip => <EquipInfo
                    info={equip}
                    equipped={false}
                    key={equip.id}
                    onError={changeError}
                />)}
            </TitleContent>
        </div>
        <TitleContent
            title={<h2 style={{ textAlign: "center", display: "block" }}>Inventory</h2>}
            style={{margin: "1em"}}
        >
            <InventoryDisplay items={props.items} />
            {props.items.length === 0 ? "You don't have any items." : null}
        </TitleContent>
        {/* Used to make the background expand into the margin of the previous div */}
        <div style={{ height: "1px" }} />
        <InstanceMenu />
    </div>;
}

InventoryPageUnmapped.displayName = "InventoryPage";


const mapStateToProps = (state: RootState): { state: StateProps } => {
    if (state.inventory.weapon.id === -1) {
        return { state: { loaded: false } }
    }
    return {
        state: {
            loaded: true,
            items: state.inventory.items,
            equips: state.inventory.equips,
            hat: state.inventory.hat,
            shirt: state.inventory.shirt,
            pants: state.inventory.pants,
            shoes: state.inventory.shoes,
            weapon: state.inventory.weapon,
            maxFloor: state.player.max_floor
        }
    };
}

let InventoryPage = connect(mapStateToProps)(InventoryPageUnmapped);

export { InventoryPage };