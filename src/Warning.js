import React from 'react';
import Sound from 'react-sound'
import './Warning.css';
import { all } from 'q';
import { useState } from 'react';
import { isProperty, tsPropertySignature } from '@babel/types';
import soundfile from './testSound.mp3';

class Warning extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            warningSound: Sound.status.STOPPED,
        }
    }

    showWarning() {
        const wrapper = document.getElementById('experimentContainer');
        wrapper.classList.toggle('warning');
        if (this.state.warningSound === Sound.status.STOPPED) {
            this.setState({warningSound : Sound.status.PLAYING});
            //this.sendScoreDelta(0);
        } else {
            this.setState({warningSound : Sound.status.STOPPED});
            this.sendScoreDelta(-1);
        }
    }

    sendScoreDelta = (delta) => {
        this.props.parentCallback(delta);
    }

    render() {
        return (
            <div>
                <button className="warningButton" onClick={() => this.showWarning()}>Condition {this.props.condition}</button>
                <Sound 
                url={soundfile}
                playStatus={this.state.warningSound}
                playFromPosition={0 /* in milliseconds */}
                onLoading={this.handleSongLoading}
                onPlaying={this.handleSongPlaying}
                onFinishedPlaying={this.handleSongFinishedPlaying}
                />
            </div>                
        )
    }
}

export default Warning