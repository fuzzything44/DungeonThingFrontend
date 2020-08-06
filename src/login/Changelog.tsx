import * as React from 'react';
import { ChangelogElement, RADIUS } from './ChangelogElement';
import changelog from "./changelog.json";
import { backgroundSecondary, border, outlineText } from '../styles';

interface ChangelogProps {
}

interface ChangeLogElement {
    date: string;
    updates: string[]
}

// This code should run once per load to prevent issues with re-rendering changing the amount shown to 0.
let unseenUpdates = -1;
if (localStorage["lastUpdate"] != null) {
    unseenUpdates = changelog.findIndex(elem => elem.date === localStorage["lastUpdate"]);
}
if (unseenUpdates < 0) {
    unseenUpdates = 5;
}
localStorage["lastUpdate"] = changelog[0].date;

const Changelog: React.FC<ChangelogProps> = (props) => {
    let [showAmount, updateShowAmount] = React.useState(unseenUpdates);
    console.log(showAmount);
    let reducedChangelog: ChangeLogElement[] = changelog.slice(0, showAmount);

    return <div>
        <div style={{ ...outlineText, textAlign: "center", margin: "0.5em" }}><h1 style={{ textAlign: "center" }}>Updates</h1></div>
        <div>
            {reducedChangelog.map(elem => <ChangelogElement key={elem.date} changeDate={elem.date} changeItems={elem.updates} />)}
            {showAmount < changelog.length ? <div
                style={{
                    ...backgroundSecondary,
                    ...border,
                    borderRadius: RADIUS,
                    margin: "0.5em",
                    marginLeft: "2.5em",
                    marginRight: "2.5em",
                    padding: "0.3em",
                    textAlign: "center"
                }}
                onClick={() => updateShowAmount(showAmount + 5 + Math.floor(showAmount / 2) )}
            >
                <h1>{showAmount === 0 ? "Show recent updates" : "Show more updates"}</h1>
            </div> : null}
            <div style={{ height: "2em" }} />
        </div>
    </div>;
}

Changelog.displayName = "Changelog";

export { Changelog }