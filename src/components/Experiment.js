import React from 'react';
import './Experiment.css';
import MatchingGame from './MatchingGame.js';
import Warning from './Warning.js';
  

const gameState = {
    MATCHING_GAME: 'match',
    WARNING: 'warning',
    LOSS_OF_POINTS: 'lop',
    SHOW_INDICATOR: 'indicator'
}
class Experiment extends React.Component {
    constructor(props) {
        super(props);
        this.gameTime = 0;
        this.gameState = gameState.MATCHING_GAME;
        this.lopStart = 30;

        this.state = {
            score: 0,
            originalCondition: "A",
            condition: "C",
            warningEnabled: false
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.onTick(),
            1000 
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID); 
    }

    onTick() {
        console.log(this.gameTime);
        this.gameTime += 1;
        if (this.gameTime === this.lopStart - 5) {
            this.toggleWarning();
            this.gameState = gameState.WARNING;
        } else if (this.gameTime === this.lopStart) {
            this.toggleWarning();
            this.gameState = gameState.LOSS_OF_POINTS;
        } else {
            this.gameState = gameState.MATCHING_GAME;
            // TODO: GENERATE NEW LOP START
        }
        this.updateGameValues();
    }

    updateGameValues() {
        // TODO: LOSS OF POINTS IF IN RIGHT CONDITION AND in LOP STATE
    }

    scoreDeltaCallback = (delta) => {
        let currScore= this.state.score;
        let newScore = currScore + delta;
        newScore = Math.max(0, newScore)
        this.setState({score: newScore});
    }

    indicatorCallback = () => {
      if (this.state.originalCondition === "C") {
        this.setState({ condition: "A"});
        console.log("condition is now A");
      } else if (this.state.originalCondition === "D") {
        this.setState({ condition: "B" });
        console.log("condition is now B");
      }
    }

    toggleWarning() {
        this.setState({
            warningEnabled: !this.state.warningEnabled
        })
        const wrapper = document.getElementById('experimentContainer');
        wrapper.classList.toggle('warning');
    }

    onClickWarning() {
        // TODO: Disable loss of points depending on the condition
    }

    render() {
        return (
        <div className="experimentContainer" id='experimentContainer'>
            <Warning
                condition={this.state.condition} 
                parentCallback={this.scoreDeltaCallback}
                isWarningEnabled={this.state.warningEnabled}
            />
            <MatchingGame 
                parentCallbackScore={this.scoreDeltaCallback} 
                score={this.state.score} 
                parentCallbackIndicator={this.indicatorCallback} 
                condition={this.state.condition}
            />
        </div>
    );}
}

export default Experiment;
