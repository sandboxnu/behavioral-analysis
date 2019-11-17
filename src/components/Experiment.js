import React from 'react';
import './Experiment.css';
import MatchingGame from './MatchingGame.js';
import Warning from './Warning.js';
import ConfigValueController from '../ConfigValueController';

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
        this.currentGameState = gameState.MATCHING_GAME;
        this.lopStart = 0;
        this.interactedWithWarningFlag = false;
        this.setNewLOPTime();

        this.state = {
            score: 0,
            originalCondition: "A",
            condition: "A",
            warningEnabled: false,
            shouldShowIndicator: false,
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
        if (this.gameTime === this.lopStart - ConfigValueController.getWarningDuration()) {
            this.toggleWarning();
            this.currentGameState = gameState.WARNING;
            console.log("Start Warning " + this.currentGameState);
        } else if (this.gameTime === this.lopStart) {
            if (this.state.warningEnabled) {
                this.toggleWarning();
            }
            this.currentGameState = gameState.LOSS_OF_POINTS;
            console.log("Start LOP " + this.currentGameState);
        } else if (this.gameTime === this.lopStart + ConfigValueController.getDurationOfLossOfPoints()) {
            this.interactedWithWarningFlag = false;
            this.currentGameState = gameState.MATCHING_GAME;
            this.setNewLOPTime();
            console.log("END LOP. New LOP Start: " + this.lopStart);
        }
        this.updateGameValues();
    }

    updateGameValues() {
        const pointsPerDec = ConfigValueController.getPointsPerDecrement() * -1;
        console.log("Update game values: " + this.currentGameState);
        // TODO: LOSS OF POINTS IF IN RIGHT CONDITION AND in LOP STATE
        if (this.currentGameState === gameState.LOSS_OF_POINTS) {
            if (this.state.condition === 'A') {
                if (!this.interactedWithWarningFlag) {
                    this.scoreDeltaCallback(pointsPerDec);
                } 
            } else if (this.state.condition === 'B') {
                this.scoreDeltaCallback(pointsPerDec);
            }
        }
    }

    setNewLOPTime() {
        this.lopStart = this.gameTime + ConfigValueController.getLossOfPointsStart();
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
        console.log("ON CLICK WARNING ");
        console.log(this);
        if (this.state.warningEnabled) {
            this.interactedWithWarningFlag = true;
            this.toggleWarning();
        }
    }

    render() {
        return (
        <div className="experimentContainer" id='experimentContainer' onClick={this.onClickWarning.bind(this)}>
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
                shouldShowIndicator={this.state.shouldShowIndicator}
            />
        </div>
    );}
}

export default Experiment;
