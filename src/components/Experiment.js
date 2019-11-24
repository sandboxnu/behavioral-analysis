import React from 'react';
import './Experiment.css';
import MatchingGame from './MatchingGame.js';
import Warning from './Warning.js';

const gameState = {
    MATCHING_GAME: 'match',
    WARNING: 'warning',
    LOSS_OF_POINTS: 'lop',
}

class Experiment extends React.Component {
    constructor(props) {
        super(props);

        let startCondition = "C";
        this.gameTime = 0;
        this.currentGameState = gameState.MATCHING_GAME;
        this.lopStart = 10;
        this.interactedWithWarningFlag = false;
        this.indicatorShowingTimer = 0;
        let indicatorFlag = false;
        if (startCondition === "C" || startCondition === "D") {
            indicatorFlag = true;
        }

        this.state = {
            score: 0,
            originalCondition: startCondition,
            condition: startCondition,
            warningEnabled: false,
            shouldShowIndicator: indicatorFlag,
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
            if (this.state.condition === 'A' || this.state.condition === 'B') {
                this.toggleWarning();
                this.currentGameState = gameState.WARNING;
                console.log("Start Warning " + this.currentGameState);
            } else {
                console.log("Warning Skipped");
            }
        } else if (this.gameTime === this.lopStart) {
            if (this.state.warningEnabled) {
                this.toggleWarning();
            }
            this.currentGameState = gameState.LOSS_OF_POINTS;
            console.log("Start LOP " + this.currentGameState);
        } else if (this.gameTime === this.lopStart + 5) {
            this.interactedWithWarningFlag = false;
            this.currentGameState = gameState.MATCHING_GAME;
            this.setUpNewTrial();
            console.log("END LOP. New LOP Start: " + this.lopStart);
        }
        this.updateGameValues();
    }

    updateGameValues() {
        console.log("Update game values: " + this.currentGameState);
        if (this.isSwitchOverConditions() && this.state.shouldShowIndicator) {
            this.indicatorShowingTimer += 1;
            // TODO: Update with configured amount
            if (this.indicatorShowingTimer >= 10) {
                this.indicatorShowingTimer = 0;
                this.setState({shouldShowIndicator: false});
            }
        }

        if (this.currentGameState === gameState.LOSS_OF_POINTS) {
            if (this.state.condition === 'A') {
                if (!this.interactedWithWarningFlag) {
                    this.scoreDeltaCallback(-1);
                } 
            } else if (this.state.condition === 'B') {
                this.scoreDeltaCallback(-1);
            } else if (this.state.condition === 'C') {
                this.scoreDeltaCallback(-1);
            } else if (this.state.condition === 'D') {
                this.scoreDeltaCallback(-1);
            }
            
        }
    }

    setUpNewTrial() {
        this.indicatorShowingTimer = 0;
        this.setNewLOPTime();
        this.showIndicatorIfNeeded();
        this.setState({
            condition: this.state.originalCondition
        })
    }

    isSwitchOverConditions() {
        return this.state.originalCondition === "C" || this.state.originalCondition === "D";
    }

    showIndicatorIfNeeded() {
        if (this.isSwitchOverConditions()) {
            this.setState({shouldShowIndicator: true});
        }
    }

    setNewLOPTime() {
        // TODO: Change to use configured time
        this.lopStart = this.gameTime + 20;
    }

    scoreDeltaCallback = (delta) => {
        let currScore= this.state.score;
        let newScore = currScore + delta;
        newScore = Math.max(0, newScore)
        this.setState({score: newScore});
    }

    indicatorCallback = () => {
      if (this.state.originalCondition === "C") {
        this.indicatorShowingTimer = 0;
        this.setState({ 
            condition: "A",
            shouldShowIndicator: false
        });
        console.log("condition is now A");
      } else if (this.state.originalCondition === "D") {
        this.indicatorShowingTimer = 0;
        this.setState({ 
            condition: "B",
            shouldShowIndicator: false 
        });
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
        if (this.state.warningEnabled) {
            this.interactedWithWarningFlag = true;
            this.toggleWarning();
        }
    }

    render() {
        console.log(this.state.shouldShowIndicator);
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
