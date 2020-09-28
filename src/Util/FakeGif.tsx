import React from "react";
import { useReducer, useEffect } from "react";

interface FakeGifProps {
    images: string[];
    repeat?: boolean;
    playTime: number;
    startTime: number;
    alt: string;
    title?: string;
    style?: React.HTMLAttributes<HTMLImageElement>["style"]
}

const FakeGif: React.FC<FakeGifProps> = (props) => {
    // Set things up to force re-render the component every frame
    // eslint-disable-next-line
    const [_, forceUpdate] = useReducer(x => x + 1, 0);
    useEffect(() => {
        const interval = setInterval(forceUpdate, props.playTime * 1000 / props.images.length);
        return () => {
            clearInterval(interval);
        }
    });
    // What percent through the series are they
    const startPercent = (Date.now() - props.startTime) / (props.playTime * 1000);
    // Which image that translates to.
    const index = Math.round(props.images.length * startPercent);

    let imageIndex: number;
    if (props.repeat) {
        imageIndex = index % props.images.length;
    } else {
        imageIndex = Math.min(index, props.images.length - 1);
    }
    return <img
        style={props.style}
        src={props.images[imageIndex]}
        alt={props.alt}
        title={props.title}
    />;
};
FakeGif.displayName = "FakeGif";

export { FakeGif };