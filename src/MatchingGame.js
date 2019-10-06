import React from 'react';
import './MatchingGame.css';
import { all } from 'q';
import { useState } from 'react';
import { isProperty, tsPropertySignature } from '@babel/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const images = ["coffee", "rocket", "check-square", "piggy-bank"];

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
        } else {
            console.log("BOO");
        }
        this.refresh(this.state.topImage);
    }

    refresh() {
        const randImage = this.getRandomImage();
        this.setState({topImage : randImage});
        this.setOtherImages(randImage);
    }

    setOtherImages(topImage) {
        console.log("Unfiltered other: " + images);
        console.log("Image to remove " + topImage);
        let filtered = images.filter(image => image !== topImage);
        console.log("Filtered other: " + filtered);
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
        console.log("All Images: " + allImages);
        return (
            <div className="matchingGameContainer">
                <div className="topImage">
                    <FontAwesomeIcon icon={this.state.topImage}/>
                </div>
                <div className="otherImagesContainer">
                    {this.renderImage(allImages[0])}
                    {this.renderImage(allImages[1])}
                    {this.renderImage(allImages[2])}
                </div>
            </div>
        );
    }
}


export default MatchingGame;
