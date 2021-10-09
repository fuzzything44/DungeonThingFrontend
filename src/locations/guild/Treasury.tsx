import * as React from 'react';
import { Modal } from '../../Util/Modal';
import { callGetInventory, ItemInfo, PlayerInfo } from '../../api/ApiObjects';
import { store, RootState } from '../../redux/store';
import { setInventory } from '../../redux/inventory/actions';
import { connect } from 'react-redux';
import { Icon } from '../../Util/Icon';
import { ResourceDonation } from './ResourceDonation';
import { ItemDonation } from './ItemDonation';
import { ItemDistribution } from './ItemDistribution';

interface StateProps {
    playerItems: ItemInfo[];
    playerMana: number;
    playerGold: number;
}

interface PassedProps {
    mana: number;
    gold: number;
    gp: number;
    items: ItemInfo[];
    self: PlayerInfo;
    members: PlayerInfo[];
};

type TreasuryProps = StateProps & PassedProps;

const TreasuryUnmapped: React.FC<TreasuryProps> = (props) => {
    const [modalOpen, changeModalOpen] = React.useState(false);

    React.useEffect(() => {
        callGetInventory({}).then(data => {
            store.dispatch(setInventory(data));
        });
    }, []);

    return <>
        <button
            style={{
                position: "absolute",
                left: "51.7em", // These 3 perfectly align it with the background doors
                top: "30.6vh",
                height: "34.8vh",
                width: "10em"
            }}
            onClick={() => changeModalOpen(true)}
        >
            <img
                style={{ width: "100%", height: "100%" }}
                src={require("../../images/guild/treasury.png")}
                alt="Back to Tavern Hub"
                title="Back to Tavern Hub"
            />
        </button>
        {modalOpen ? <Modal title="Guild Treasury" onClose={() => changeModalOpen(false)}>
            <div style={{ width: "60vw"}} />
            <h2>Guild Resources</h2>
            <section style={{ margin: "0.5em", overflow: "auto" }}>
                {/* Display resources in 2-column format */}
                <div style={{ float: "left", width: "50%" }}>
                    {props.mana} <Icon icon="mana" /><br />
                    {props.gp} Guild Points
                </div>
                <div>
                    {props.gold} <Icon icon="gold" />
                </div>
            </section>
            <h2>Guild Items</h2>
            <section>
                {props.items.map(item => <ItemDistribution
                    item={item}
                    key={JSON.stringify(item)}
                    self={props.self}
                    members={props.members}
                />)}
            </section>
            <hr />
            <h2>Your Resources</h2>
            <section style={{ margin: "0.5em", overflow: "auto" }}>
                {/* Display resources in 2-column format */}
                <div style={{ float: "left", width: "50%" }}>
                    <ResourceDonation amountHeld={props.playerMana} resource={<Icon icon="mana" />} name="mana" />
                </div>
                <div>
                    <ResourceDonation amountHeld={props.playerGold} resource={<Icon icon="gold" />} name="gold" />
                </div>
            </section>
            <h2>Your Items</h2>
            <section>
                {props.playerItems.map(item => <ItemDonation item={item} key={JSON.stringify(item)} />)}
            </section>
        </Modal> : null}
    </>;
}

function mapStateToProps(state: RootState): StateProps {
    return {
        playerItems: state.inventory.items,
        playerGold: state.player.gold,
        playerMana: state.player.mana
    }
}

export const Treasury = connect(mapStateToProps)(TreasuryUnmapped);