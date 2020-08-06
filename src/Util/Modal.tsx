import * as React from 'react';
import { backgroundSecondary, backgroundColor } from '../styles';

interface ModalProps {
    onClose: () => void;
    title: string;
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
            backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        onClick={(e) => { e.stopPropagation(); props.onClose(); }}
    >
        <div
            onClick={e => e.stopPropagation()}
            style={{
                ...backgroundColor,
                position: "fixed",
                display: "block",
                top: "40%",
                left: "50%",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                padding: "1em",
                border: "1px solid black",
                width: "40%",
                minWidth: "15em",
                minHeight: "25em"
            }}
        >
            <div
                style={{
                    borderBottom: "1px solid black",
                    paddingBottom: "0.5em",
                    marginBottom: "0.5em"
                }}
            >
                <h1>{props.title}</h1>
                <button style={{
                    ...backgroundSecondary,
                    display: "flex",
                    position: "absolute",
                    right: "1em",
                    top: "0.5em",
                    fontSize: "x-large",
                    border: "1px solid black",
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
            <div>{props.children}</div>
        </div>
    </div>;
}

export { Modal };