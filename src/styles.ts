export const backgroundColor = {
    backgroundColor: "white",
}

export const BORDER_COLOR = "black";
export const border = {
    border: "1px solid " + BORDER_COLOR
}

export const backgroundSecondary = {
    backgroundColor: "aliceblue"
}

export const errorColor = {
    color: "#e61616"
};

export const errorBackground = {
    backgroundColor: "#ffdddd"
}

export const outlineText = {
    textShadow: "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white",
}

export const buttonStyle = {
    ...border,
    ...backgroundSecondary,
    borderRadius: "0.3em",
    paddingLeft: "0.2em",
    paddingRight: "0.2em"
}