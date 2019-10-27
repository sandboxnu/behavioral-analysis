import React from 'react';
import './MatchingGame.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Indicator from './Indicator.js';


const images = ["coffee", "rocket", "check-square", "piggy-bank"];

var scoreDiv = {
    float: 'right',
    display: 'inline-block',
    padding: '5px',
    margin: '5px',
    textAlign: 'center',
    position: 'absolute',
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: '1em',
    top: '0',
    right: '0',
    fontFamily: 'Barlow',
};

var scoreTitle = {
    fontSize: '1em',
    position: 'absolute',
    top: '10px',
    right: '15px',
    color: '#636360',
};

var scoreNumber = {
    fontSize: '3em',
    position: 'absolute',
    top: '20px',
    right: '15px',
    color: '#636360',
};


class MatchingGame extends React.Component {
    constructor(props) {
        super(props);
        let randImage = this.getRandomImage();
        this.state = {
          topImage: randImage,
        };

        this.otherImages = images.filter(image => image !== this.state.topImage);
    }

    renderImage(image) {
        return (
        <div className="otherImage" >
            <FontAwesomeIcon icon={image} onClick={() => this.handleClick(image)}/>
        </div>)
    }

    handleClick(image) {
        if (image === this.state.topImage) {
            console.log("YAY");
            this.sendScoreDelta(1);
        } else {
            console.log("BOO");
            //this.sendScoreDelta(0);
        }
        this.refresh();
    }

    sendScoreDelta = (delta) => {
        this.props.parentCallbackScore(delta);
    }

    refresh() {
        const randImage = this.getRandomImage();
        this.setState({topImage : randImage});
        this.setOtherImages(randImage);
    }

    setOtherImages(topImage) {
        let filtered = images.filter(image => image !== topImage);
        this.otherImages = filtered;
        
    }

    shuffle(arrayOfImages) {
        return arrayOfImages.sort(() => Math.random() - 0.5);
    }

    getRandomImage() {
        return images[Math.floor(Math.random()*images.length)];
    }

    render() {
        this.shuffle(this.otherImages);
        let allImages = this.shuffle([this.state.topImage, this.otherImages[0], this.otherImages[1]]);
        return (
            <div id="backgroundContainer" className="backgroundContainer">
                <div className="matchingGameContainer">

                    <Indicator condition={this.props.condition} parentCallbackIndicator={this.props.parentCallbackIndicator}/>
                    <div style={scoreDiv}>
                        <div style={scoreTitle}>SCORE</div>
                        <div style={scoreNumber}> {this.props.score}</div>
                    </div>
                    <div className="topImage">
                        <FontAwesomeIcon icon={this.state.topImage}/>
                    </div>
                    <div className="otherImagesContainer">
                        {this.renderImage(allImages[0])}
                        {this.renderImage(allImages[1])}
                        {this.renderImage(allImages[2])}
                    </div>
                </div>
            </div>
            
        );
    }
}

  export default MatchingGame