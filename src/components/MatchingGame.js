import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Indicator from './Indicator.js';
import styled, {keyframes} from 'styled-components';

const images = ["coffee", "rocket", "check-square", "piggy-bank"];

const Score = styled.div` 
    float: 'right',
    display: 'inline-block',
    padding: '5px',
    margin: '5px',
    text-align: 'center',
    position: 'absolute',
    text-transform: 'uppercase',
    font-weight: '400',
    font-size: '1em',
    top: '0',
    right: '0',
    font-family: 'Barlow',
`;

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

const TopImage = styled.div`
    display: flex;
    justify-content: center;
    font-size: 8em;
    margin-top: 5%;
`;

const BottomImage = styled.div`
    display: flex;
    font-size: 8em;
    justify-content: center;
`;

const BottomImageContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
    position: absolute;
    bottom: 10%;
`;

const MatchingGameContainer = styled.div`
    position: absolute;
    opacity: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 60%;
    background: rgba(253, 253, 253, 0.986);
    border-radius: 0px;
    box-shadow: 6px 6px 6px rgba(0, 0, 0, .5);
    overflow: hidden;
`;

class MatchingGame extends React.Component {
    constructor(props) {
        super(props);
        let randImage = this.getRandomImage();
        this.state = {
          topImage: randImage,
        };

        this.otherImages = images.filter(image => image !== this.state.topImage);
        this.shuffle(this.otherImages);
        this.allImages = this.shuffle([this.state.topImage, this.otherImages[0], this.otherImages[1]]);
    }

    renderImage(image) {
        return (
        <BottomImage>
            <FontAwesomeIcon icon={image} onClick={() => this.handleClick(image)}/>
        </BottomImage>)
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
        let filtered = images.filter(image => image !== randImage);
        this.otherImages = filtered;
        this.shuffle(this.otherImages);
        this.allImages = this.shuffle([randImage, this.otherImages[0], this.otherImages[1]]);
    }

    shuffle(arrayOfImages) {
        return arrayOfImages.sort(() => Math.random() - 0.5);
    }

    getRandomImage() {
        return images[Math.floor(Math.random()*images.length)];
    }

    onClickContainer(e) {
        // Prevent the parent from seeing the onclick
        e.stopPropagation();
    }

    render() {
        return (
            <div id="backgroundContainer" className="backgroundContainer">
                <MatchingGameContainer onClick={this.onClickContainer}>
                    <Indicator 
                        condition={this.props.condition} 
                        parentCallbackIndicator={this.props.parentCallbackIndicator}
                        shouldShowIndicator={this.props.shouldShowIndicator}
                    />
                    <Score>
                        <div style={scoreTitle}>SCORE</div>
                        <div style={scoreNumber}> {this.props.score}</div>
                    </Score>
                    <TopImage>
                        <FontAwesomeIcon icon={this.state.topImage}/>
                    </TopImage>
                    <BottomImageContainer>
                        {this.renderImage(this.allImages[0])}
                        {this.renderImage(this.allImages[1])}
                        {this.renderImage(this.allImages[2])}
                    </BottomImageContainer>
                </MatchingGameContainer>
            </div>
            
        );
    }
}

  export default MatchingGame