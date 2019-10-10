import React from 'react';
import './Launch.css';
import './Experiment.css';
import MatchingGame from './MatchingGame.js';
import styled from 'styled-components'
import Warning from './Warning.js';



function Experiment() {
  return (
    <div className="experimentContainer" id='experimentContainer'>
        <Warning
          condition={"A"}/>
        <MatchingGame/>
    </div>
  );
}

export default Experiment;
