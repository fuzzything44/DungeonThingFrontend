import * as React from 'react';
import { border } from './styles';
import { RootState } from './redux/store';
import { connect } from 'react-redux';
import { formatNumber } from './Util/numberFormat';
import { Icon } from './Util/Icon';
import { Link } from 'react-router-dom';
import { PAGES } from './pages';
import { LOCATIONS } from './locations/locations';
import { GiftInfo } from './api/ApiObjects';
import { Gift } from './inventory/Gift';
import { Modal } from './Util/Modal';

interface StateProps {
    mana: number;
    manaPerMin: number;
    gifts: GiftInfo[];
};

type InstanceMenuProps = StateProps & {

}

const InstanceMenuBase: React.FC<InstanceMenuProps> = (props) => {
    const [giftsOpen, changeGiftsOpen] = React.useState(false);

    return <>
        <div style={{
            position: "fixed",
            top: "0",
            right: "0",
            display: "flex"
        }}>
            {props.gifts.length > 0 ? <button style={{
                height: "3em",
                padding: "0.5em"
            }}
                onClick={() => changeGiftsOpen(true)}
            >
                <img style={{ height: "100%", animation: "wiggle 2s infinite"}} src={require("./images/gift.png")} alt="Gifts" title="Gifts" />
            </button> : null}
            <div
                style={{
                    borderBottom: border.border,
                    borderLeft: border.border,
                    borderBottomLeftRadius: "0.7em",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    padding: "0.5em"
                }}
            >
                <div style={{
                    float: "left",
                    padding: "0.5em",
                    paddingTop: "0"
                }}>
                    {formatNumber(props.mana)} <Icon icon="mana" /><br />
                    {formatNumber(props.manaPerMin)} <Icon icon="mana" />/minute<br />
                </div>
                <div style={{ float: "left" }}>
                    <Link to={LOCATIONS.TAVERN}>
                        <img
                            src={require("./images/mug.png")}
                            style={{
                                height: "2em",
                                padding: "0.5em"
                            }}
                            alt="To tavern"
                            title="To tavern"
                        />
                    </Link>
                </div>
                <div style={{ float: "left" }}>
                    <Link to={PAGES.SETTINGS}>
                        <img
                            src={require("./images/gear.png")}
                            style={{
                                height: "2em",
                                padding: "0.5em"
                            }}
                            alt="Account Settings"
                            title="Account"
                        />
                    </Link>
                </div>
            </div>
        </div>
        {giftsOpen && props.gifts.length > 0 ? <Modal onClose={() => changeGiftsOpen(false)} title="Claim gifts">
            {props.gifts.map(gift => <Gift {...gift} key={gift.id} />)}
        </Modal> : null}
    </>;
};

InstanceMenuBase.displayName = "InstanceMenu";

const mapStateToProps = (state: RootState): StateProps => {
    return {
        mana: state.player.mana,
        manaPerMin: state.player.manaPerMin,
        gifts: state.inventory.gifts
    };
}
const InstanceMenu = connect(mapStateToProps)(InstanceMenuBase);
export { InstanceMenu };