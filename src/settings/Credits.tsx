import * as React from 'react';
import { TitleContent } from '../Util/TitleContent';


const Credits: React.FC<{}> = () => {
    return null;
    return <TitleContent title={<h2>Credits</h2>}>
        Programming & Game Design: fuzzything44<br />
        Art: fuzzything44<br />

    </TitleContent>;
};

Credits.displayName = "Credits";

export { Credits }