import * as React from 'react';


const CombatPage: React.FC = () => {
    return <div>
        <img
            style={{
                position: "absolute",
                top: "0",
                left: "0",
                height: "100%",
                width: "25em"
            }}
            alt=""
            src={require("../images/tavern_left.png")}
        />
        <div
            style={{
                position: "absolute",
                top: "0",
                left: "25em",
                height: "100%",
                width: "calc(100% - 25em)",
                backgroundImage: `url(${require("../images/tavern_repeat.png")})`,
                backgroundSize: "25em 100%",
                backgroundRepeat: "repeat-x"
            }}
        />
        <div style={{ position: "absolute", width: "100%", height: "100%", top: "0", left: "0" }}>
            Combat page goes here
        </div>
        
    </div>;

}

CombatPage.displayName = "CombatPage";

export { CombatPage };
