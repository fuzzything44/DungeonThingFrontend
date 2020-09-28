import * as React from 'react';
import { border, errorBackground } from '../styles';
import { TitleContent } from './TitleContent';

interface ModalProps {
    onClose: () => void;
    title: string;
    hideClose?: boolean;
    noPad?: boolean;
}

const Modal: React.FC<ModalProps> = (props) => {
    return <div
        style={{
            display: "block",
            height: "100vh",
            width: "100vw",
            position: "fixed",
            zIndex: 999,
            top: "0",
            left: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}
        onClick={(e) => { e.stopPropagation(); props.onClose(); }}
    >
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                top: "10%"
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{ width: "max-content" }}
            >
                <TitleContent
                    title={
                        <div style={{ position: "relative" }}>
                            <h1>{props.title}</h1>
                            <button style={{
                                ...errorBackground,
                                display: props.hideClose ? "none" : "flex",
                                position: "absolute",
                                right: "0.1em",
                                top: "-0.1em",
                                fontSize: "1.5em",
                                ...border,
                                borderRadius: "0.3em",
                                width: "1em",
                                height: "0.7em",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingBottom: "0.3em"
                            }}
                                onClick={props.onClose}
                            >
                                x
                        </button>
                        </div>
                    }
                    noPad={props.noPad}
                >
                    <div style={{
                        padding: props.noPad ? "" : "0.5em",
                        maxHeight: "65vh",
                        overflowY: "auto"
                    }}>
                        {props.children}
                    </div>
                </TitleContent>
                </div>
        </div>
    </div>;
}

export { Modal };