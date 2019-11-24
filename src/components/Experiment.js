import React from 'react';
import './Experiment.css';
import MatchingGame from './MatchingGame.js';
import Warning from './Warning.js';
import DataBuilder from  './DataBuilder.js'

const dataCollector  = new DataBuilder();

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
        this.lopStart = 10;
        this.interactedWithWarningFlag = false;

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
        if (this.gameTime === this.lopStart - 5) {
            this.toggleWarning();
            this.currentGameState = gameState.WARNING;
            console.log("Start Warning " + this.currentGameState);
            dataCollector.addEvent("warningAppeared",  this.gameTime);
        } else if (this.gameTime === this.lopStart) {
            if (this.state.warningEnabled) {
                this.toggleWarning();
                dataCollector.addEvent("warningEnded", this.gameTime);
            }
            this.currentGameState = gameState.LOSS_OF_POINTS;
            console.log("Start LOP " + this.currentGameState);
            dataCollector.addEvent("lossOfPointsBegin", this.gameTime);
            dataCollector.addEvent("endTrial", this.gameTime);
        } else if (this.gameTime === this.lopStart + 5) {
            this.interactedWithWarningFlag = false;
            this.currentGameState = gameState.MATCHING_GAME;
            this.setNewLOPTime();
            console.log("END LOP. New LOP Start: " + this.lopStart);
            dataCollector.addEvent("lossOfPointsEnd", this.gameTime);
            dataCollector.addEvent("beginTrial", this.gameTime);
        }
        this.updateGameValues();
    }

    updateGameValues() {
        console.log("Update game values: " + this.currentGameState);
        dataCollector.addEvent("update", this.gameTime);
        // TODO: LOSS OF POINTS IF IN RIGHT CONDITION AND in LOP STATE
        if (this.currentGameState === gameState.LOSS_OF_POINTS) {
            if (this.state.condition === 'A') {
                if (!this.interactedWithWarningFlag) {
                    this.scoreDeltaCallback(-1);
                } 
            } else if (this.state.condition === 'B') {
                this.scoreDeltaCallback(-1);
            }
        }
    }

    setNewLOPTime() {
        // TODO: Change to use configured time
        this.lopStart = this.gameTime + 20;
    }

    scoreDeltaCallback = (delta) => {
        let currScore = this.state.score;
        let newScore = currScore + delta;
        newScore = Math.max(0, newScore)
        this.setState({score: newScore});
    }

    matchingGameCallback = (isCorrect) => {
        if (isCorrect) {
            dataCollector.addEvent("anweredCorrectly", this.gameTime);
        } else {
            dataCollector.addEvent("answeredWrong", this.gameTime);
        }
    }

    indicatorCallback = () => {
      dataCollector.addEvent("indicatorDissappeared", this.gameTime);  
      if (this.state.originalCondition === "C") {
        this.setState({ condition: "A"});
        console.log("condition is now A");
        dataCollector.addEvent("beginCondition", this.gameTime);
      } else if (this.state.originalCondition === "D") {
        this.setState({ condition: "B" });
        console.log("condition is now B");
        dataCollector.addEvent("beginCondition",  this.gameTime);
      }
    }

    indicatorAppeared = () => {
        dataCollector.addEvent("indicatorAppeared", this.gameTime);
    }

    questionAppearedCallback = () => {
        dataCollector.addEvent("questionAppeared", this.gameTime);
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
            dataCollector.addEvent("warningInteraction", this.gameTime);
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
                matchingGameAnswer={this.matchingGameCallback}
                score={this.state.score} 
                parentCallbackIndicator={this.indicatorCallback}
                indicatorAppeared={this.indicatorAppeared} 
                condition={this.state.condition}
                shouldShowIndicator={this.state.shouldShowIndicator}
                questionAppeared={this.questionAppearedCallback}
            />
        </div>
    );}
}

export default Experiment;
