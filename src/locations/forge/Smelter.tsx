import * as React from 'react';
import { Modal } from '../../Util/Modal';
import { ErrorBox } from '../../Util/ErrorBox';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';


interface SmelterProps {
}

const SmelterUnmapped: React.FC<SmelterProps> = (props) => {
    return <>
        <div
            style={{
                position: "absolute",
                left: "7em",
                top: "0"
            }}
        >
            <img
                style={{ height: "40em" }}
                src={require("../../images/smelter.png")}
                alt="Smelter"
                title="Smelter"
            />
        </div>
    </>
}

SmelterUnmapped.displayName = "Smelter";

function mapStateToProps(rootState: RootState): SmelterProps {
    return {

    };
}

export const Smelter = connect(mapStateToProps)(SmelterUnmapped);