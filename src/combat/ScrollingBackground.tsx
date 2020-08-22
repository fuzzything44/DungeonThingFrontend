import * as React from "react";

interface ScrollingBackgroundProps {
    paused: boolean;
    image: string;
}

interface ScrollingBackgroundState {

}

export class ScrollingBackground extends React.Component<ScrollingBackgroundProps, ScrollingBackgroundState> {
    render() {
        return <div style={{
            position: "absolute",
            top: "0",
            left: "0",
            height: "100vh",
            width: "100vw",
            overflow: "hidden",
        }}>
            <div
                style={{
                    height: "100%",
                    width: "calc(100% + 25em)",
                    position: "relative",
                    left: "-25em",
                    backgroundImage: this.props.image,
                    backgroundSize: "25em 100%",
                    backgroundRepeat: "repeat-x",
                    animation: "slide 3s linear infinite",
                    animationPlayState: this.props.paused ? "paused" : "running"
                }}
            />
        </div>
    }
}