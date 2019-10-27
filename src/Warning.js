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
            timeLeft: 20 + Math.floor(10 * Math.random()),
            warningSound: Sound.status.STOPPED,
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

        if (this.state.timeLeft === 5) {
            this.toggleWarning();
        } else if (this.state.timeLeft === 0) {
            if ( this.userHasNotClicked() ){
                this.toggleWarning();
                this.sendScoreDelta(-1);
            } else if  (this.props.condition === "B" 
                || this.props.condition === "D") {
                    this.sendScoreDelta(-1);
                }
        }

        this.setState({timeLeft: this.state.timeLeft - 1});
    }

    userHasNotClicked() {
        return this.state.warningSound === Sound.status.PLAYING;
    }

    toggleWarning() {
        const wrapper = document.getElementById('experimentContainer');
        wrapper.classList.toggle('warning');
        if (this.state.warningSound === Sound.status.STOPPED) {
            this.setState({warningSound : Sound.status.PLAYING});
        } else {
            this.setState({warningSound : Sound.status.STOPPED});
        }
    }

    handleClick() {
        if (this.state.warningSound === Sound.status.PLAYING) {
            this.toggleWarning();
        }
    }

    sendScoreDelta = (delta) => {
        this.props.parentCallback(delta);
    }

    render() {
        return (
            <div>
                <button className="warningButton" onClick={() => this.handleClick()}>Condition {this.props.condition}</button>
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