import * as React from 'react';
import { TitleContent } from '../Util/TitleContent';

interface ChangelogElementProps {
    changeDate: string;
    changeItems: string[];
}

const ChangelogElement: React.FC<ChangelogElementProps> = (props) => {
    return <TitleContent title={<h2>{props.changeDate}</h2>} style={{ margin: "1.5em" }}>
        <ul style={{
            margin: "0"
        }}>
            {props.changeItems.map(item => <li key={item}>{item}</li>)}
        </ul>
        
    </TitleContent>;
}

ChangelogElement.displayName = "ChangelogElement";

export { ChangelogElement };