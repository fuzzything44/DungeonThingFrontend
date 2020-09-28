import * as React from 'react';

interface BoxedImageProps {
    image: string;
    title: string;
    borderColor: string;
    style?: React.HTMLAttributes<HTMLImageElement>["style"];
}

const BoxedImage: React.FC<BoxedImageProps> = (props) => {
    return <div style={{
        display: "inline-block",
        height: "3em",
        width: "3em",
        position: "relative",
        ...props.style
    }}>
        <img
            src={props.image}
            style={{
                border: "2px solid",
                height: "100%",
                width: "100%",
                borderRadius: "0.5em",
                borderColor: props.borderColor,
                boxSizing: "border-box"
            }}
            title={props.title}
            alt={props.title}
        />
        {props.children ? <div style={{ position: "absolute", left: "0em", top: "0em", height: "100%", width: "100%" }}>
            {props.children}
        </div> : null}
    </div>;


}
BoxedImage.displayName = "BoxedImage";

export { BoxedImage };