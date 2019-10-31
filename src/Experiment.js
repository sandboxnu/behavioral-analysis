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
            condition: "C",
        }
    }

    scoreDeltaCallback = (delta) => {
        let currScore= this.state.score;
        let newScore = currScore + delta;
        this.setState({score: newScore});
    }

    indicatorCallback = () => {
      if (this.state.condition === "C") {
        this.setState({ condition: "A"});
        console.log("condition is now A");
      } else if (this.state.condition === "D") {
        this.setState({ condition: "B" });
        console.log("condition is now B");
      }
    }

    render() {
        return (
        <div className="experimentContainer" id='experimentContainer'>
            <Warning
                condition={"A"} parentCallback={this.scoreDeltaCallback}/>
            <MatchingGame parentCallbackScore={this.scoreDeltaCallback} score={this.state.score} parentCallbackIndicator={this.indicatorCallback} condition={this.state.condition}/>
        </div>
    );}
}

export default Experiment;
