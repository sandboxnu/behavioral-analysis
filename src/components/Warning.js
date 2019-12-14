import React from 'react';
import Sound from 'react-sound'
import './Warning.css';
import { all } from 'q';
import { useState } from 'react';
import { isProperty, tsPropertySignature } from '@babel/types';
import soundfile from '../assets/testSound.mp3';

class Warning extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.tutorialMode) {
            let playStatus = Sound.status.STOPPED;
            if (this.props.isWarningEnabled) {
                playStatus = Sound.status.PLAYING;
            }
            return (
                <div>
                    <Sound
                        url={soundfile}
                        playStatus={playStatus}
                        playFromPosition={0 /* in milliseconds */}
                        onLoading={this.handleSongLoading}
                        onPlaying={this.handleSongPlaying}
                        onFinishedPlaying={this.handleSongFinishedPlaying}
                    />
                </div>
            )
        } else {
            return null;
        }
    }
}

export default Warning