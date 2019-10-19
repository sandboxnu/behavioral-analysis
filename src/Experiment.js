import React from 'react';
import './Launch.css';
import './Experiment.css';
import MatchingGame from './MatchingGame.js';
import styled from 'styled-components'
import Warning from './Warning.js';

var divStyle = {
    float: 'right',
    color: 'white',
    backgroundColor: 'lightsteelblue',
    display: 'inline-block',
    width: '190px',
    height: '80px',
    padding: '0.7em 1.4em',
    borderRadius: '0.1em',
    textAlign: 'center',
    position: 'absolute',
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: '22px',
    top: '0',
    right: '0',
    fontFamily: 'Roboto'
};
  

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
                condition={"A"} parentCallback={this.scoreDeltaCallback}/>
            <div style={divStyle}>Score: {this.state.score}</div>
            <MatchingGame parentCallback={this.scoreDeltaCallback}/>
        </div>
    );}
}

export default Experiment;
