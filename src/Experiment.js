import React from 'react';
import './Launch.css';
import './Experiment.css';
import MatchingGame from './MatchingGame.js';
import Warning from './Warning.js';
  

class Experiment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
        }
    }

    scoreDeltaCallback = (delta) => {
        let currScore= this.state.score;
        let newScore = currScore + delta;
        this.setState({score: newScore});
    }

    render() {
        return (
        <div className="experimentContainer" id='experimentContainer'>
            <Warning
                condition={"A"} 
                parentCallback={this.scoreDeltaCallback} />
            <MatchingGame 
                parentCallback={this.scoreDeltaCallback}
                score={this.state.score}/>
        </div>
    );}
}

export default Experiment;
