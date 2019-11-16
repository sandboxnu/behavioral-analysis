import React from 'react';
import './Experiment.css';
import MatchingGame from './MatchingGame.js';
import Warning from './Warning.js';
  

class Experiment extends React.Component {
    constructor(props) {
        super(props);
        this.gameTime = 0;

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
        this.gameTime += 1;
        console.log(this.gameTime);
        if (this.gameTime == 10) {
            this.toggleWarning();
        }

        if (this.gameTime == 15) {
            this.toggleWarning();
        }
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
