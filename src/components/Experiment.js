import React from 'react';
import './Experiment.css';
import MatchingGame from './MatchingGame.js';
import Warning from './Warning.js';
import End from './End.js';
import DataBuilder from  './DataBuilder.js'
import ConfigValueController from '../ConfigValueController';
import ServerUtils from '../ServerUtils';

const dataCollector = new DataBuilder();

const gameState = {
    MATCHING_GAME: 'match',
    WARNING: 'warning',
    LOSS_OF_POINTS: 'lop',
}

class Experiment extends React.Component {
    constructor(props) {
        super(props);

        let startCondition = this.props.condition;
        this.isTutorial = startCondition === "tutorial"
        this.gameTime = 0;
        this.currentGameState = gameState.MATCHING_GAME;
        this.lopStart = ConfigValueController.getLossOfPointsStart();
        console.log(this.lopStart);
        this.interactedWithWarningFlag = false;
        this.indicatorShowingTimer = 0;
        let indicatorFlag = false;
        this.backgroundColor = ConfigValueController.getColorForCondition(startCondition);

        if (startCondition === "C" || startCondition === "D") {
            indicatorFlag = true;
        }

        this.state = {
            score: 0,
            originalCondition: startCondition,
            condition: startCondition,
            warningEnabled: false,
            shouldShowIndicator: indicatorFlag,
            isConditionOver: false,
        }

        dataCollector.setUserID(this.props.userId);
        dataCollector.setCondition(this.props.condition);
        console.log("tutMode: " +  this.isTutorial);
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
        if (this.gameTime > ConfigValueController.getConditionDuration()) { 
            if(!this.isTutorial) {
                ServerUtils.sendData(dataCollector.getDataObject());
                clearInterval(this.timerID);
                this.endGame();
                return;
            } 
        }

        console.log(this.gameTime);
        this.gameTime += 1;

        if (this.gameTime === this.lopStart - ConfigValueController.getWarningDuration()) {
            if (this.state.condition === 'A' || this.state.condition === 'B') {
                this.toggleWarning();
                this.currentGameState = gameState.WARNING;
                console.log("Start Warning " + this.currentGameState);
                dataCollector.addEvent("warningAppeared", this.gameTime);
            } else {
                console.log("Warning Skipped");
            }
        } else if (this.gameTime === this.lopStart) {
            if (this.state.warningEnabled) {
                this.toggleWarning();
                dataCollector.addEvent("warningEnded", this.gameTime);
            }
            this.currentGameState = gameState.LOSS_OF_POINTS;
            console.log("Start LOP " + this.currentGameState);
            dataCollector.addEvent("lossOfPointsBegin", this.gameTime);
            dataCollector.addEvent("endTrial", this.gameTime);
        } else if (this.gameTime === this.lopStart + ConfigValueController.getPointsDecrementDuration()) {
            this.interactedWithWarningFlag = false;
            this.currentGameState = gameState.MATCHING_GAME;
            this.setUpNewTrial();
            console.log("END LOP. New LOP Start: " + this.lopStart);
            dataCollector.addEvent("lossOfPointsEnd", this.gameTime);
            dataCollector.addEvent("beginTrial", this.gameTime);
        }
        this.updateGameValues();
    }

    updateGameValues() {
        console.log("Update game values: " + this.currentGameState);
        dataCollector.addEvent("update", this.gameTime);
        if (this.isSwitchOverConditions() && this.state.shouldShowIndicator) {
            this.indicatorShowingTimer += 1;
            if (this.indicatorShowingTimer >= ConfigValueController.getIndicatorDuration()) {
                this.indicatorShowingTimer = 0;
                this.setState({ shouldShowIndicator: false });
            }
        }

        const pointsDecrement = ConfigValueController.getPointsPerDecrement() * -1;

        if (this.currentGameState === gameState.LOSS_OF_POINTS) {
            if (this.state.condition === 'A') {
                if (!this.interactedWithWarningFlag) {
                    this.scoreDeltaCallback(pointsDecrement);
                }
            } else if (this.state.condition === 'B') {
                this.scoreDeltaCallback(pointsDecrement);
            } else if (this.state.condition === 'C') {
                this.scoreDeltaCallback(pointsDecrement);
            } else if (this.state.condition === 'D') {
                this.scoreDeltaCallback(pointsDecrement);
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
            this.setState({ shouldShowIndicator: true });
        }
    }

    setNewLOPTime() {
        this.lopStart = this.gameTime + ConfigValueController.getLossOfPointsStart();
        console.log("New LOP START" + this.lopStart);
    }

    scoreDeltaCallback = (delta) => {
        let currScore = this.state.score;
        let newScore = currScore;
        if (this.isTutorial) {
            if (delta <= 0) {
                newScore = 0;
            } else {
                newScore = currScore + delta;
            }
            if (currScore == 19) {
                newScore = 0;
                this.endGame();
            }
        } else {
            newScore = currScore + delta;
        }

        newScore = Math.max(0, newScore)
        this.setState({ score: newScore });
    }

    matchingGameCallback = (isCorrect) => {
        if (isCorrect) {
            dataCollector.addEvent("answeredCorrectly", this.gameTime);
        } else {
            dataCollector.addEvent("answeredWrong", this.gameTime);
        }
    }

    indicatorCallback = () => {
        dataCollector.addEvent("indicatorDissappeared", this.gameTime);
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
        if (this.state.warningEnabled) {
            dataCollector.addEvent("warningInteraction", this.gameTime);
            this.interactedWithWarningFlag = true;
            this.toggleWarning();
        }
    }

    endGame() {
        this.setState({
            isConditionOver: true
        });
    }

    render() {
        if (this.state.isConditionOver) {
            return ( 
                <div>
                    <End endScore={this.state.score}/>
                </div>
            );
        }
        return (
            <div>
                <div
                    style={{ backgroundColor: this.backgroundColor }}
                    className="experimentContainer"
                    id='experimentContainer'
                    onClick={this.onClickWarning.bind(this)}
                >
                    <Warning
                        tutorialMode={this.isTutorial}
                        condition={this.state.condition}
                        parentCallback={this.scoreDeltaCallback}
                        isWarningEnabled={this.state.warningEnabled}
                    />
                </div>
                <MatchingGame
                    tutorialMode={this.isTutorial}
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
        );


    }
}

export default Experiment;
