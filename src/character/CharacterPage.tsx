import * as React from 'react';
import { InstanceMenu } from '../InstanceMenu';
import { connect } from 'react-redux';
import { RootState } from '../redux/store';


interface StateProps {

};

type CharacterProps = StateProps;

const CharacterPageUnmapped: React.FC<CharacterProps> = (props) => {
    return <div>
        character page
        <br />
        STATS HERE <br />
        ATTRIBUTES HERE <br />
        SKILLS HERE?
    </div>;
}

CharacterPageUnmapped.displayName = "CharacterPage";


const mapStateToProps = (state: RootState): StateProps => {
    return {

    };
}

let CharacterPage = connect(mapStateToProps)(CharacterPageUnmapped);

export { CharacterPage };