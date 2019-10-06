import React from 'react';
import './Launch.css';
import Experiment from './Experiment.js'

function Launch() {
  return (
    <div className="Launch">
      <header className="experiment-title">
        <Experiment/>
      </header>
    </div>
  );
}

export default Launch;
